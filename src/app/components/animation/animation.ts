import { trigger, state, style, animate, transition, query, group } from '@angular/animations';

export const blogAnimation = trigger('blogAnimation', [
    transition(':enter', [
      group([
        query('#hero-section', [
          style({ transform: 'translateY(-20px)'}),
          animate("1s")
        ]),
        query('#blog-posts', [
          style({ transform: 'translateX(-50px)'}),
          animate("1s")
        ]),
        query('#side-bar', [
          style({ transform: 'translateX(50px)'}),
          animate("1s")
        ])
      ])
    ])
  ])

export const homeAnimation = trigger('homeAnimation', [
    transition(':enter', [
      group([
        query('.section-1', [
          style({ transform: 'translateY(-20px)'}),
          animate("2s")
        ]),
        query('.section-2', [
          style({ transform: 'translateY(-50px)'}),
          animate("2s")
        ]),
        query('.section-3', [
          style({ transform: 'translateX(50px)'}),
          animate("2s")
        ]),
        query('.home_section1_hero', [
          style({ transform: 'translateX(-50px)'}),
          animate("2s")
        ]),
        query('.home_section1_subtitle', [
          style({ transform: 'translateX(50px)'}),
          animate("2s")
        ]),
      ])
    ])
  ])

export const footerAnimation = trigger('footerAnimation', [
    transition(':enter', [
      group([
        query('.section-1', [
          style({ transform: 'translateY(-20px)'}),
          animate("3s")
        ]),
        query('.section-2', [
          style({ transform: 'translateX(-50px)'}),
          animate("2s")
        ]),
        query('.section-3', [
          style({ transform: 'translateX(50px)'}),
          animate("2s")
        ]),
      ])
    ])
  ])

export const navbarAnimation = trigger('navbarAnimation', [
    transition(':enter', [
      group([
        query('.navbar', [
          style({ transform: 'translateY(-20px)'}),
          animate("2s")
        ])
      ])
    ])
  ])
