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
import { AppStateService } from '../services/app-state.service';
import { LED } from '../types/led.type';
import { DataFormatter } from '../utils/data-formatter';
import { LEDConnectionType } from '../enums/led-connection-type.enum';

const STRING_PREFIX = '{';
const STRING_SUFFIX = '}';

@Component({
  selector: 'app-code-display',
  imports: [],
  templateUrl: './code-display.component.html',
  styleUrl: './code-display.component.scss'
})
export class CodeDisplayComponent {
  appStateService = inject(AppStateService);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  matrixType = this.appStateService.getMatrixSettings();

  matrixStateSignal: Signal<LED[]> = this.appStateService.getMatrixStateSignal();
  stringCode: Signal<string> = computed(() => this.getOutputString(this.matrixStateSignal()));

  private getOutputString(matrix: LED[]): string {
    const dataString = DataFormatter.formatMatrix(
      matrix,
      this.matrixType.rows,
      this.matrixType.cols,
      LEDConnectionType.SERPENTINE_HORIZONTAL_RIGHT_LEFT
    );
    return `${STRING_PREFIX}${dataString}${STRING_SUFFIX}`;
  }
}
