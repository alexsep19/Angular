import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/map';
import { LogService } from '../services/log.service';


@Injectable()
export class TimeService {
   constructor(private logService: LogService) {
     logService.log('TimeService is created');
   }

  time(): Observable<Date> {
     return interval(1000).map(m => new Date());
  }
}
