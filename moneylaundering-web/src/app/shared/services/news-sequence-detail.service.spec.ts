import { TestBed } from '@angular/core/testing';

import { NewsSequenceDetailService } from './news-sequence-detail.service';

describe('NewsSequemceDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsSequenceDetailService = TestBed.get(NewsSequenceDetailService);
    expect(service).toBeTruthy();
  });
});
