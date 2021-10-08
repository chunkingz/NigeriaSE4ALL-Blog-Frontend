import { trigger, state, style, animate, transition, query, group } from '@angular/animations';

export const blogAnimation = trigger('blogAnimation', [
    transition(':enter', [
      group([
        query('#hero-section', [
          style({ transform: 'translateY(-20px)'}),
          animate(1000)
        ]),
        query('#blog-posts', [
          style({ transform: 'translateX(-50px)'}),
          animate(1000)
        ]),
        query('#side-bar', [
          style({ transform: 'translateX(50px)'}),
          animate(1000)
        ])
      ])
    ])
  ])