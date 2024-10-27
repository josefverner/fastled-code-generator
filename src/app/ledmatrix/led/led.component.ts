import { Component, inject, input } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-led',
  standalone: true,
  imports: [],
  templateUrl: './led.component.html',
  styleUrl: './led.component.scss'
})
export class LEDComponent {
  state = input();
  ledId = input<number>();
  appStateService = inject(AppStateService);

  ngOnInit() {
    //console.log(this.ledId());
  }

  toggleLED = () => {
    console.log(this.ledId());
    console.log('Toggle');

    const id = this.ledId()!;

    this.appStateService.setLEDState(id, true);
  };
}
