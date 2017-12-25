import { Component } from '@angular/core';
import { LogService } from '../../services/log.service';
import { SlideAnimation } from '../../animation-triggers/slide-animation';
import { ComponentCanDeactivate } from '../../guards/can-deactivate-component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [SlideAnimation]
})
export class AnimationComponent implements ComponentCanDeactivate {
  state: string;

  constructor(private logService: LogService) {
    logService.log('AnimationComponent is created');
    this.state = 'hide';
  }

  canDeactivate(): boolean | Observable<boolean> {
    return confirm('Покинуть страницу?');
  }

  show() {
    this.state = 'show';
  }

  hide() {
    this.state = 'hide';
  }
}
