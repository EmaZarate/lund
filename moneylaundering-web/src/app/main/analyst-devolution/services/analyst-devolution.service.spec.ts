import { TestBed } from '@angular/core/testing';

import { AnalystDevolutionService } from './analyst-devolution.service';

describe('AnalystDevolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalystDevolutionService = TestBed.get(AnalystDevolutionService);
    expect(service).toBeTruthy();
  });
});
