import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly document = inject(DOCUMENT);

  private renderer: Renderer2;

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  setGlobalStyle(styles: string): void {
    const styleElement = this.renderer.createElement('style') as HTMLStyleElement;
    styleElement.textContent = styles;
    this.document.head.appendChild(styleElement);
  }
}
