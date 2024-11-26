import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
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
export class LEDMatrixComponent implements OnInit {
  appStateService = inject(AppStateService);
  settings = input.required<LEDMatrix>();

  ledMatrix: LED[] = [];

  ngOnInit() {
    console.log('LED matrix component initialized');
    this.ledMatrix = this.appStateService.matrixState;
    console.log(this.ledMatrix);
  }

  ngAfterViewInit() {
    console.log('LED matrix component ngAfterViewInit');
  }
}
