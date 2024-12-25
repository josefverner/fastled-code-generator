import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LEDMatrixComponent } from './ledmatrix/ledmatrix.component';
import { ModeSelectorComponent } from './mode-selector/mode-selector.component';
import { CodeDisplayComponent } from './code-display/code-display.component';
import { AppStateService } from './services/app-state.service';
import { StyleService } from './services/style.service';
import { LEDMatrix } from './types/matrix.type';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, LEDMatrixComponent, ModeSelectorComponent, CodeDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly stateService = inject(AppStateService);
  private readonly configService = inject(ConfigService);
  private readonly styleService = inject(StyleService);

  matrixSettings = signal<LEDMatrix>({ name: '', rows: 0, cols: 0, default: false });

  constructor() {
    const matrix = this.stateService.getMatrixSettings();
    const ledDiameter = this.configService.getVariable('ledDiameter') as number;
    const ledBorderWidth = this.configService.getVariable('ledBorderWidth') as number;

    this.matrixSettings.set(matrix);

    const dynamicStyles = this.createDynamicStyles(ledDiameter, ledBorderWidth, matrix);
    this.styleService.setGlobalStyle(dynamicStyles);
  }

  private createDynamicStyles(ledDiameter: number, ledBorderWidth: number, matrix: LEDMatrix): string {
    return `
      :root {
        --LED-size: ${ledDiameter}px;
        --LED-border-width: ${ledBorderWidth}px;
        --LED-diameter: 23px;
        --matrix-width: calc(var(--LED-size) * ${matrix.cols});
        --matrix-height: calc(var(--LED-size) * ${matrix.rows});
      }
    `;
  }
}
