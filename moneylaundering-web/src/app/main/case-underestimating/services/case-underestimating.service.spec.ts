import { TestBed } from '@angular/core/testing';

import { CaseUnderestimatingService } from './case-underestimating.service';

describe('CaseUnderestimatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseUnderestimatingService = TestBed.get(CaseUnderestimatingService);
    expect(service).toBeTruthy();
  });
});
