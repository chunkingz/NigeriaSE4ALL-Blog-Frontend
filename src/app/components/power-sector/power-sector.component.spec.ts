import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSectorComponent } from './power-sector.component';

describe('PowerSectorComponent', () => {
  let component: PowerSectorComponent;
  let fixture: ComponentFixture<PowerSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
