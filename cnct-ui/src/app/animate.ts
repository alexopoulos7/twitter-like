import {animate, style, transition, state, trigger} from "@angular/core";
export const animations = [
  trigger('flyInOutFast', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateX(100%)'}))
    ])
  ]),
  trigger('flyInOutSlow', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(750)
    ]),
    transition('* => void', [
      animate(750, style({transform: 'translateX(100%)'}))
    ])
  ]),
  trigger('fadeInLeft', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-5%)', opacity: 0}),
      animate(750)
    ])
  ]),
  trigger('fadeInRight', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(5%)', opacity: 0}),
      animate(750)
    ])
  ]),
  trigger('fadeIn', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({opacity: 0}),
      animate(750)
    ])
  ])
];