import { LED } from '../types/led.type';
import { LEDConnectionType } from '../enums/led-connection-type.enum';

export class DataFormatter {
  static formatMatrix(matrix: LED[], rows: number, cols: number, mode: LEDConnectionType): string {
    if (matrix.length !== rows * cols) {
      throw new Error('Matrix size does not match the specified dimensions.');
    }

    let result: number[] = [];
    switch (mode) {
      case LEDConnectionType.SERPENTINE_HORIZONTAL_LEFT_RIGHT:
        result = this.serpentine(matrix, rows, cols, true, true);
        break;
      case LEDConnectionType.SERPENTINE_HORIZONTAL_RIGHT_LEFT:
        result = this.serpentine(matrix, rows, cols, false, true);
        break;
      case LEDConnectionType.SERPENTINE_VERTICAL_LEFT_RIGHT:
        result = this.serpentine(matrix, rows, cols, true, false);
        break;
      case LEDConnectionType.SERPENTINE_VERTICAL_RIGHT_LEFT:
        result = this.serpentine(matrix, rows, cols, false, false);
        break;

      case LEDConnectionType.ZIGZAG_HORIZONTAL_LEFT_RIGHT:
        result = this.zigzag(matrix, rows, cols, true, true);
        break;
      case LEDConnectionType.ZIGZAG_HORIZONTAL_RIGHT_LEFT:
        result = this.zigzag(matrix, rows, cols, false, true);
        break;
      case LEDConnectionType.ZIGZAG_VERTICAL_LEFT_RIGHT:
        result = this.zigzag(matrix, rows, cols, true, false);
        break;
      case LEDConnectionType.ZIGZAG_VERTICAL_RIGHT_LEFT:
        result = this.zigzag(matrix, rows, cols, false, false);
        break;
      default:
        throw new Error('Unknown formatting mode.');
    }

    return result.join(', ');
  }

  private static serpentine(
    matrix: LED[],
    rows: number,
    cols: number,
    isFromLeftToRight: boolean,
    isHorizontal: boolean
  ): number[] {
    const result: number[] = [];

    const primaryLoop = isHorizontal ? rows : cols;
    const secondaryLoop = isHorizontal ? cols : rows;

    let elements: LED[] = [];
    for (let i = 0; i < primaryLoop; i++) {
      for (let j = 0; j < secondaryLoop; j++) {
        if (isHorizontal) {
          if (i % 2 === (isFromLeftToRight ? 0 : 1)) {
            elements.push(matrix[i * cols + j]);
          } else {
            const reversedIndex = i * cols + (cols - 1 - j);
            const normalIndex = i * cols + j;

            elements.push({ id: normalIndex, isOn: matrix[reversedIndex].isOn });
          }
        } else {
          if (isFromLeftToRight) {
            const normalIndex = i * cols + j;
            const verticalIndex = j * rows + i;

            if (i % 2 === 0) {
              elements.push({ id: normalIndex, isOn: matrix[verticalIndex].isOn });
            } else {
              const reversedVerticalIndex = (secondaryLoop - 1 - j) * rows + i;
              elements.push({ id: normalIndex, isOn: matrix[reversedVerticalIndex].isOn });
            }
          } else {
            const normalIndex = i * cols + j;
            const verticalIndex = j * rows + (rows - 1 - i);

            if (i % 2 === 0) {
              elements.push({ id: normalIndex, isOn: matrix[verticalIndex].isOn });
            } else {
              const reversedVerticalIndex = (cols - 1 - j) * rows + (rows - 1 - i); // Flip vertically
              elements.push({ id: normalIndex, isOn: matrix[reversedVerticalIndex].isOn });
            }
          }
        }
      }
    }

    result.push(...elements.filter((cell) => cell.isOn).map((cell) => cell.id));
    return result;
  }

  private static zigzag(
    matrix: LED[],
    rows: number,
    cols: number,
    isFromLeftToRight: boolean,
    isHorizontal: boolean
  ): number[] {
    const result: number[] = [];
    const primaryLoop = isHorizontal ? rows : cols;
    const secondaryLoop = isHorizontal ? cols : rows;

    for (let i = 0; i < primaryLoop; i++) {
      let elements: LED[] = [];

      for (let j = 0; j < secondaryLoop; j++) {
        const index = isHorizontal
          ? i * cols + (i % 2 === 0 ? j : cols - 1 - j)
          : i % 2 === 0
          ? j * rows + i
          : (secondaryLoop - 1 - j) * rows + i;

        elements.push(matrix[index]);
      }

      // No additional reversal needed, zig-zag is intrinsic
      if (!isFromLeftToRight) {
        elements.reverse();
      }

      result.push(...elements.filter((cell) => cell.isOn).map((cell) => cell.id));
    }

    return result;
  }
}
