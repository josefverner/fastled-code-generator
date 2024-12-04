import { Injectable, signal, WritableSignal } from '@angular/core';
import { LED_MATRIX_CONFIG } from '../models/matrix.model';
import { LEDMatrix } from '../types/matrix.type';
import { LED } from '../types/led.type';
import { MatrixType } from '../enums/matrix-type.enum';
import { LEDConnectionType } from '../enums/led-connection-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  matrixState: LED[] = [];
  private matrixStateSignal: WritableSignal<LED[]> = signal([]);
  private LEDConnectionTypeState: LEDConnectionType = LEDConnectionType.SERPENTINE_HORIZONTAL_LEFT_RIGHT;

  constructor() {
    const matrix = this.getMatrixSettings();
    const matrixCount = matrix.cols * matrix.rows;
    const initialMatrix = Array.from({ length: matrixCount }, (_, id) => ({ id, isOn: false }));

    this.matrixState = initialMatrix;
    this.matrixStateSignal.set(initialMatrix);
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

  getMatrixStateSignal() {
    return this.matrixStateSignal.asReadonly();
  }

  getLEDArray(LEDAmount: number): LED[] {
    return new Array(LEDAmount).fill({ state: false });
  }

  getLEDConnectiopnType(): LEDConnectionType {
    return this.LEDConnectionTypeState;
  }

  setLEDState(id: number, isActive: boolean, color?: string) {
    const led = this.matrixState.find((led) => led.id === id);

    if (led) {
      Object.assign(led, {
        isOn: isActive,
        ...(color ? { color } : {})
      });
    }

    this.matrixStateSignal.set([...this.matrixState]);
  }
}
