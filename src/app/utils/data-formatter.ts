import { LED } from '../types/led.type';

export class DataFormatter {
  static formatMatrix(matrix: LED[], rows: number, cols: number, mode: string): string {
    if (matrix.length !== rows * cols) {
      throw new Error('Matrix size does not match the specified dimensions.');
    }

    let result: number[] = [];
    switch (mode) {
      case 'horizontal-serpentine':
        result = this.serpentine(matrix, rows, cols, true);
        break;
      case 'horizontal-zigzag':
        result = this.zigzag(matrix, rows, cols, true);
        break;
      case 'vertical-serpentine':
        result = this.serpentine(matrix, rows, cols, false);
        break;
      case 'vertical-zigzag':
        result = this.zigzag(matrix, rows, cols, false);
        break;
      default:
        throw new Error('Unknown formatting mode.');
    }

    return result.join(', ');
  }

  private static serpentine(matrix: LED[], rows: number, cols: number, isHorizontal: boolean): number[] {
    const result: number[] = [];
    const primaryLoop = isHorizontal ? rows : cols;
    const secondaryLoop = isHorizontal ? cols : rows;

    for (let i = 0; i < primaryLoop; i++) {
      const isReversed = i % 2 === 1;
      const elements = [];

      for (let j = 0; j < secondaryLoop; j++) {
        const index = isHorizontal ? i * cols + j : j * cols + i;
        elements.push(matrix[index]);
      }

      if (isReversed) elements.reverse();
      result.push(...elements.filter((cell) => cell.isOn).map((cell) => cell.id));
    }

    result.sort((a, b) => a - b);
    return result;
  }

  private static zigzag(matrix: LED[], rows: number, cols: number, isHorizontal: boolean): number[] {
    const result: number[] = [];
    const primaryLoop = isHorizontal ? rows : cols;
    const secondaryLoop = isHorizontal ? cols : rows;

    for (let i = 0; i < primaryLoop; i++) {
      for (let j = 0; j < secondaryLoop; j++) {
        const index = isHorizontal ? i * cols + j : j * cols + i;
        if (matrix[index].isOn) {
          result.push(matrix[index].id);
        }
      }
    }

    result.sort((a, b) => a - b);
    return result;
  }
}
