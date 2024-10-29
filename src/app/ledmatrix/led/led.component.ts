import { AfterViewInit, Component, inject, input } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { LED } from '../../types/led.type';
import { CommonModule } from '@angular/common';

const COLOR_OFF = '505050';
const COLOR_ON = 'e9e9e9';

@Component({
  selector: 'app-led',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './led.component.html',
  styleUrl: './led.component.scss'
})
export class LEDComponent implements AfterViewInit {
  ledState = input<LED>();
  ledId = input<number>();
  appStateService = inject(AppStateService);

  toggleLED = () => {
    const id = this.ledId()!;
    this.appStateService.setLEDState(id, !this.ledState()!.isOn);
  };

  setColor(color = COLOR_ON): string {
    return !this.ledState()?.isOn ? `#${COLOR_OFF}` : `#${color}`;
  }

  ngAfterViewInit() {
    console.log('LED component initialized');
  }
}
