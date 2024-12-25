import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { AppVariables } from './app.variables';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideExperimentalZonelessChangeDetection(),
    { provide: 'APP_VARIABLES', useValue: AppVariables }
  ]
};
