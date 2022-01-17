import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMapComponent } from './about-map.component';

describe('AboutMapComponent', () => {
  let component: AboutMapComponent;
  let fixture: ComponentFixture<AboutMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
