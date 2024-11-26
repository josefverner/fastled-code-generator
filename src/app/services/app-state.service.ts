import { Injectable, signal, WritableSignal } from '@angular/core';
import { LED_MATRIX_CONFIG } from '../models/matrix.model';
import { LEDMatrix } from '../types/matrix.type';
import { LED } from '../types/led.type';
import { MatrixType } from '../enums/matrix-type.enum';
import { StringType } from '../enums/string-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  matrixState: LED[] = [];
  private matrixStateSignal: WritableSignal<LED[]> = signal([]);
  private stringTypeState: StringType = StringType.SnakeLeftRight;

  constructor() {
    const matrix = this.getMatrixSettings();
    const matrixCount = matrix.cols * matrix.rows;

    const initialMatrix = Array.from({ length: matrixCount }, (_, id) => ({ id, isOn: false }));

    console.log('Matrix state initialized');
    //console.log(this.matrixState);
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

  getStringTypeState(): StringType {
    return this.stringTypeState;
  }

  setLEDState(id: number, isActive: boolean, color?: string) {
    console.log(`Setting LED state: ${id} to ${isActive}`);

    const updatedMatrix = this.matrixState.map((led) =>
      led.id === id ? { ...led, isOn: isActive, color: color ?? led.color } : led
    );

    console.log(updatedMatrix);
    this.matrixStateSignal.set(updatedMatrix);
  }
}
