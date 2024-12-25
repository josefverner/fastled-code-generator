import { Component, inject, input } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { LED } from '../../types/led.type';
import { CommonModule } from '@angular/common';

const COLOR_OFF = '505050';
const COLOR_ON = 'e9e9e9';

@Component({
  selector: 'app-led',
  imports: [CommonModule],
  templateUrl: './led.component.html',
  styleUrl: './led.component.scss'
})
export class LEDComponent {
  state = input<LED>();
  id = input<number>();
  private appStateService = inject(AppStateService);

  toggleLED = () => {
    this.appStateService.setLEDState(this.id()!, !this.state()!.isOn);
  };

  setColor(color = COLOR_ON): string {
    return !this.state()?.isOn ? `#${COLOR_OFF}` : `#${color}`;
  }
}
