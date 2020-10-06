import { TestBed } from '@angular/core/testing';

import { CaseHigherInstanceDerivationService } from './case-higher-instance-derivation.service';

describe('CaseHigherInstanceDerivationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseHigherInstanceDerivationService = TestBed.get(CaseHigherInstanceDerivationService);
    expect(service).toBeTruthy();
  });
});
