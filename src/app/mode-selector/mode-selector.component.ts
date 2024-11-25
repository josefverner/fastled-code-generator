import { Component } from '@angular/core';
import { LEDMatrixComponent } from '../ledmatrix/ledmatrix.component';

@Component({
    selector: 'app-mode-selector',
    imports: [LEDMatrixComponent],
    templateUrl: './mode-selector.component.html',
    styleUrl: './mode-selector.component.scss'
})
export class ModeSelectorComponent {}
