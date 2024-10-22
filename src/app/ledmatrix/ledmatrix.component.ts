import { Component, signal } from '@angular/core';
import { LED_MATRIX_CONFIG } from '../models/matrix.model';
import { LEDMatrix } from '../types/matrix.type';

@Component({
  selector: 'app-ledmatrix',
  standalone: true,
  imports: [],
  templateUrl: './ledmatrix.component.html',
  styleUrl: './ledmatrix.component.scss'
})
export class LEDMatrixComponent {
  matrixType = signal<LEDMatrix | undefined>(undefined);

  ngOnInit() {
    const defaultMatrix = LED_MATRIX_CONFIG.find((matrix: LEDMatrix) => matrix.default);
    this.matrixType.set(defaultMatrix);

    console.log('Matrix Type:', this.matrixType());
  }
}
