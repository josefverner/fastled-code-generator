import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-code-display',
    imports: [],
    templateUrl: './code-display.component.html',
    styleUrl: './code-display.component.scss'
})
export class CodeDisplayComponent {
  codeToDisplay = signal<string>('{}');
}
