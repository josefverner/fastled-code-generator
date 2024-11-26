import { Component, effect, inject, signal } from '@angular/core';
import { ArrayConverterService } from '../services/array-converter.service';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-code-display',
  imports: [],
  templateUrl: './code-display.component.html',
  styleUrl: './code-display.component.scss'
})
export class CodeDisplayComponent {
  // retrieve the data from the array-converter service
  appStateService = inject(AppStateService);
  arrayConverterService = inject(ArrayConverterService);

  foo = this.appStateService.getMatrixStateSignal();

  constructor() {
    console.log('Code display component initialized');

    effect(() => {
      console.log(this.foo);
    });
  }
}
