import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { StringType } from '../enums/string-type.enum';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrayConverterService {
  private dataOutput = signal<string>('{}');

  dataOutput$ = toObservable(this.dataOutput).pipe(map(() => this.getArraySnakeLeftRight()));

  private getArraySnakeLeftRight(arrayType?: StringType): void {
    const foo = `[
      [0, 1, 2, 3, 4],
      [9, 8, 7, 6, 5],
      [10, 11, 12, 13, 14],
      [19, 18, 17, 16, 15],
      [20, 21, 22, 23, 24]
    ]`;
    this.dataOutput.set(foo);
  }
}
