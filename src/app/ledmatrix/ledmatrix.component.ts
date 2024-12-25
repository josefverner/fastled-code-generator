import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LEDMatrix } from '../types/matrix.type';
import { LEDComponent } from './led/led.component';
import { LED } from '../types/led.type';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-ledmatrix',
  imports: [LEDComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ledmatrix.component.html',
  styleUrl: './ledmatrix.component.scss'
})
export class LEDMatrixComponent {
  private readonly appStateService = inject(AppStateService);

  settings = input.required<LEDMatrix>();

  ledMatrix: LED[] = [];

  constructor() {
    this.ledMatrix = this.appStateService.matrixState;
  }
}
