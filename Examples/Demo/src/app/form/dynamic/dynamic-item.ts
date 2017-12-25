import { Type } from '@angular/core';
import { IData } from './data-interface';

export class DynamicItem {
    constructor(public type: Type<IData>, public data: any) {}
}
