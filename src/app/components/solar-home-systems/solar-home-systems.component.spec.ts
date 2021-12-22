import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarHomeSystemsComponent } from './solar-home-systems.component';

describe('SolarHomeSystemsComponent', () => {
  let component: SolarHomeSystemsComponent;
  let fixture: ComponentFixture<SolarHomeSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarHomeSystemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarHomeSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
