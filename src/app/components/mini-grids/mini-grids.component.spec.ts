import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniGridsComponent } from './mini-grids.component';

describe('MiniGridsComponent', () => {
  let component: MiniGridsComponent;
  let fixture: ComponentFixture<MiniGridsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniGridsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
