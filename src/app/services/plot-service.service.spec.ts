import { TestBed } from '@angular/core/testing';

import { PlotServiceService } from './plot-service.service';

describe('PlotServiceService', () => {
  let service: PlotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
