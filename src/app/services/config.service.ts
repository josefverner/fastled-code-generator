import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(@Inject('APP_VARIABLES') private appVariables: any) {}

  getVariable(key: string): any {
    return this.appVariables[key];
  }
}
