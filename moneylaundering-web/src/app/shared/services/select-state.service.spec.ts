import { TestBed } from '@angular/core/testing';

import { SelectStateService } from './select-state.service';

describe('SelectProvinceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectStateService = TestBed.get(SelectStateService);
    expect(service).toBeTruthy();
  });
});
