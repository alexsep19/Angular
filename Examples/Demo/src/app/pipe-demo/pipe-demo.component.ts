import { Component } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { TimeService } from '../services/time.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-pipe-demo',
  templateUrl: './pipe-demo.component.html',
  styleUrls: ['./pipe-demo.component.css']
})
export class PipeDemoComponent {
  now: Date = new Date();
  today: number = Date.now();
  str = 'Hello world!';
  numbers: number[] = [1, 2, 3, 4, 5];
  value = 123.4567;
  value2 = 0.259;
  cost = 25;
  object: Object = {a: 1, b: new Date(), c: {d: 'abc', e: [1, 2, 3]}};
  time: Observable<Date>;
  result: string[] = ['A', 'B'];

  constructor(private timeService: TimeService, private logService: LogService) {
     logService.log('PipeDemoComponent is created');
     this.time = this.timeService.time();
  }
}
