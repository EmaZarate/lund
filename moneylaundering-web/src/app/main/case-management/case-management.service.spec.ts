import { TestBed } from '@angular/core/testing';

import { CaseManagementService } from './case-management.service';

describe('CaseManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseManagementService = TestBed.get(CaseManagementService);
    expect(service).toBeTruthy();
  });
});
