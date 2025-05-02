import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease', style({ opacity: 0, transform: 'translateX(-10%)' }))
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(10%)', opacity: 0 }),
        animate('300ms ease', style({ opacity: 1, transform: 'translateX(0%)' }))
      ], { optional: true })
    ])
  ])
]);
