import { Component, isDevMode, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { HeartBeatAnimation } from './animation-triggers/heart-beat-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [HeartBeatAnimation]
})
export class AppComponent implements AfterViewInit {
  header = 'Angular demo';
  footer = '2017 RBT';
  isDevMode: boolean;
  state = 'one';
  options: Object; // notification options

  constructor(private title: Title) {
     this.isDevMode = isDevMode();
     title.setTitle(environment.header);
     this.options = {
      timeOut: 3000,
      preventDuplicates: true
     };
   }

   ngAfterViewInit() {
     setTimeout(() => {
       this.state = 'two';
     }, 0);
   }

   onEnd(event) {
    this.state = 'one';
    if (event.toState === 'one') {
      setTimeout(() => {
        this.state = 'two';
      }, 0);
    }
  }
}
