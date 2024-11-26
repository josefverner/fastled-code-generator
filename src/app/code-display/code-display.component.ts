import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal
} from '@angular/core';
import { ArrayConverterService } from '../services/array-converter.service';
import { AppStateService } from '../services/app-state.service';
import { LED } from '../types/led.type';
import { DataFormatter } from '../utils/data-formatter';

@Component({
  selector: 'app-code-display',
  imports: [],
  templateUrl: './code-display.component.html',
  styleUrl: './code-display.component.scss'
})
export class CodeDisplayComponent {
  // retrieve the data from the array-converter service
  appStateService = inject(AppStateService);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  arrayConverterService = inject(ArrayConverterService);

  stringCode: string = '';
  matrixStateSignal: Signal<LED[]> = this.appStateService.getMatrixStateSignal();

  constructor() {
    console.log('Code display component initialized');

    effect(() => {
      this.stringCode = this.getOutputString(this.appStateService.getMatrixStateSignal()());
      console.log(this.stringCode);
      console.log('Matrix state changed');
      this.cdRef.detectChanges();
    });
  }

  private getOutputString(matrix: LED[]): string {
    return DataFormatter.formatMatrix(matrix, 16, 16, 'horizontal-serpentine');
  }
}
