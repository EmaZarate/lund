import { TestBed } from '@angular/core/testing';

import { SelectNewsReasonTypeService } from './select-news-reason-type.service';

describe('SelectNewsReasonTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectNewsReasonTypeService = TestBed.get(SelectNewsReasonTypeService);
    expect(service).toBeTruthy();
  });
});
