import { Injectable } from '@angular/core';
import { StringType } from '../enums/string-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ArrayConverterService {
  constructor() {}

  getArraySnakeLeftRight(arrayType?: StringType): string {
    return `[
      [0, 1, 2, 3, 4],
      [9, 8, 7, 6, 5],
      [10, 11, 12, 13, 14],
      [19, 18, 17, 16, 15],
      [20, 21, 22, 23, 24]
    ]`;
  }
}
