import { TestBed } from '@angular/core/testing';

import { CaseInfoRequirementService } from './case-info-requirement.service';

describe('CaseInfoRequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseInfoRequirementService = TestBed.get(CaseInfoRequirementService);
    expect(service).toBeTruthy();
  });
});
