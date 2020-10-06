import { TestBed } from '@angular/core/testing';

import { CaseEndingService } from './case-ending.service';

describe('CaseEndingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseEndingService = TestBed.get(CaseEndingService);
    expect(service).toBeTruthy();
  });
});
