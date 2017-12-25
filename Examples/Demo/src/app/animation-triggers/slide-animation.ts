import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

export const SlideAnimation: AnimationTriggerMetadata = trigger('slide', [
  state('hide', style({
    // opacity: '0.1',
    // transform: 'translateX(-100%) scale(0)'
    transform: 'translateX(-150%)'
  })),
  state('show', style({
   // opacity: '1',
   // transform: 'translateX(50%) scale(1)'
   transform: 'translateX(50%)'
  })),
  transition('hide => show', animate('1500ms ease-out')),
  transition('show => hide', animate('1500ms ease-in'))
]);

