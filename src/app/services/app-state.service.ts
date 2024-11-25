import { Injectable } from '@angular/core';
import { LED_MATRIX_CONFIG } from '../models/matrix.model';
import { LEDMatrix } from '../types/matrix.type';
import { LED } from '../types/led.type';
import { MatrixType } from '../enums/matrix-type.enum';
import { StringType } from '../enums/string-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private matrixState: LED[] = [];
  private stringTypeState: StringType = StringType.SnakeLeftRight;

  constructor() {
    const matrix = this.getMatrixSettings();
    const matrixCount = matrix.cols * matrix.rows;

    for (let i = 0; i < matrixCount; i++) {
      const led: LED = {
        id: i,
        isOn: false
      };
      this.matrixState.push(led);
    }

    console.log(this.matrixState);
  }

  getMatrixSettings(matrixType?: MatrixType): LEDMatrix {
    let matrix: LEDMatrix;

    if (!matrixType) {
      matrix = LED_MATRIX_CONFIG.find((matrix: LEDMatrix) => matrix.default)!;
    } else {
      matrix = LED_MATRIX_CONFIG.find((matrix: LEDMatrix) => matrix.name === matrixType)!;
    }

    return matrix;
  }

  getLEDArray(LEDAmount: number): LED[] {
    return new Array(LEDAmount).fill({ state: false });
  }

  getMatrixState(): LED[] {
    return this.matrixState;
  }

  getStringTypeState(): StringType {
    return this.stringTypeState;
  }

  setLEDState(id: number, isActive: boolean, color?: string) {
    const ledIndex = this.matrixState.findIndex((led) => led.id === id);

    if (ledIndex !== -1) {
      this.matrixState[ledIndex] = {
        ...this.matrixState[ledIndex],
        isOn: isActive,
        ...(color ? { color } : {})
      };
    }
  }
}
