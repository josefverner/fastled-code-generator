import { Injectable } from '@angular/core';
import { LED_MATRIX_CONFIG } from '../models/matrix.model';
import { LEDMatrix } from '../types/matrix.type';
import { MatrixType } from '../enums/matrix-type.enum';
import { LED } from '../types/led.type';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
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
}
