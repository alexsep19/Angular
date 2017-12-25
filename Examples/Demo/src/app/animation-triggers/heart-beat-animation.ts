import { AnimationTriggerMetadata, animate, state, style, transition, trigger, keyframes } from '@angular/animations';

export const HeartBeatAnimation: AnimationTriggerMetadata = trigger('heartBeat', [
  state('one', style({
    transform: 'scale(1,1)'
  })),
  state('two', style({
    transform: 'scale(1,1)'
  })),
  transition('one => two', animate('1s' , keyframes([
      style({transform: 'scale(1, 1)', offset: 0.92}),
      style({transform: 'scale(1.2, 1.2)', offset: 0.94}),
      style({transform: 'scale(1, 1)', offset: 0.96}),
      style({transform: 'scale(1.1, 1.1)', offset: 0.98}),
      style({transform: 'scale(1, 1)', offset: 1})
  ]))),
  transition('two => one', animate('0s'))
]);
