import { TestBed } from '@angular/core/testing';

import { ChartsApiService } from './charts-api.service';

describe('ChartsApiService', () => {
  let service: ChartsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
