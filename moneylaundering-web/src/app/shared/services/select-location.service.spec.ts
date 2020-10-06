import { TestBed } from '@angular/core/testing';

import { SelectLocationService } from './select-location.service';

describe('SelectLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectLocationService = TestBed.get(SelectLocationService);
    expect(service).toBeTruthy();
  });
});
