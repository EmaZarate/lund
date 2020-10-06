import { TestBed } from '@angular/core/testing';

import { DocketService } from './docket.service';

describe('DocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocketService = TestBed.get(DocketService);
    expect(service).toBeTruthy();
  });
});
