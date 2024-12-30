import { Injectable } from '@angular/core';

const COLOR_OFF = '505050';
const COLOR_ON = 'e9e9e9';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {
  private currentColor: string = COLOR_OFF;

  getCurrentColor(): string {
    return this.currentColor;
  }

  setCurrentColor(color: string): void {
    this.currentColor = color;
  }
}
