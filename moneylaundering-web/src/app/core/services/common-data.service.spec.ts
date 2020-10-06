import { TestBed } from '@angular/core/testing';

import { CommonDataService } from './common-data.service';

describe('CommonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonDataService = TestBed.get(CommonDataService);
    expect(service).toBeTruthy();
  });
});