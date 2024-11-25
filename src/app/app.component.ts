import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LEDMatrixComponent } from './ledmatrix/ledmatrix.component';
import { ModeSelectorComponent } from './mode-selector/mode-selector.component';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { AppStateService } from './services/app-state.service';
import { LEDMatrix } from './types/matrix.type';

@Component({
    selector: 'app-root',
    imports: [CommonModule, LEDMatrixComponent, ModeSelectorComponent, CodeDisplayComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  stateService = inject(AppStateService);

  matrixSettings = signal<LEDMatrix>({ name: '', rows: 0, cols: 0, default: false });

  constructor() {
    const matrix = this.stateService.getMatrixSettings();
    this.matrixSettings.set(matrix);
  }
}
