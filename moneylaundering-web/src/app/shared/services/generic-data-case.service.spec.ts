import { TestBed } from '@angular/core/testing';

import { GenericDataCaseService } from './generic-data-case.service';

describe('GenericDataCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericDataCaseService = TestBed.get(GenericDataCaseService);
    expect(service).toBeTruthy();
  });
});
