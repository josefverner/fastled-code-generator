import { Injectable } from '@angular/core';
import { LED_MATRIX_CONFIG } from '../models/matrix.model';
import { LEDMatrix } from '../types/matrix.type';
import { MatrixType } from '../enums/matrix-type.enum';
import { LED } from '../types/led.type';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  matrixState: LED[] = [];

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

  setLEDState(id: number, isActive: boolean, color?: string) {
    console.log('setLEDState');

    const updatedLED = this.matrixState.find((led) => {
      return led.id === id;
    })!;
    this.matrixState = this.matrixState.filter((led) => led.id !== id);

    updatedLED.isOn = isActive;

    this.matrixState.push(updatedLED);

    this.matrixState.sort((a, b) => {
      return a.id - b.id;
    });
    console.log(this.matrixState);
  }
}
