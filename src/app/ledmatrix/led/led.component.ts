import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { LED } from '../../types/led.type';
import { CommonModule } from '@angular/common';
import { PaintingService } from '../../services/painting.service';

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

  private readonly appStateService = inject(AppStateService);
  private readonly paitingService = inject(PaintingService);

  isPainting = false;

  backgroundColor: WritableSignal<string> = signal(COLOR_OFF);

  toggleLED = (event: MouseEvent) => {
    event.preventDefault();

    const color = this.state()!.isOn ? COLOR_OFF : COLOR_ON;
    this.paitingService.setCurrentColor(color);
    this.appStateService.setLEDState(this.id()!, !this.state()!.isOn, color);
    this.setColor(color);
  };

  onEnter = (event: MouseEvent) => {
    event.preventDefault();

    const color = this.paitingService.getCurrentColor();
    if (event.buttons === 1 && color !== this.state()!.color) {
      this.isPainting = true;
      // console.log('state', this.state());
      this.appStateService.setLEDState(this.id()!, !this.state()!.isOn, color);
      this.setColor(color);
    } else {
      this.isPainting = false;
    }
  };

  onLeave = (event: MouseEvent) => {
    event.preventDefault();

    // console.log(event);
  };

  setColor(color = COLOR_ON): void {
    // console.log('isPainting', this.isPainting);
    if (this.isPainting) {
      color = `#${color}`;
    } else {
      color = !this.state()?.isOn ? `#${COLOR_OFF}` : `#${color}`;
    }

    this.backgroundColor.set(color);

    // console.log('color', this.backgroundColor());
  }
}
