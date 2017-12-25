import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  constructor() {
     console.log('LogService is created');
  }

  log(msg: any) {
    console.log(msg);
  }

  warn(msg: any) {
    console.warn(msg);
  }

  error(msg: any) {
    console.error(msg);
  }
}
