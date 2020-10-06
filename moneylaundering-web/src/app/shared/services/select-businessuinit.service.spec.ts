import { TestBed } from '@angular/core/testing';

import { SelectBusinessuinitService } from './select-businessuinit.service';

describe('SelectBusinessuinitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectBusinessuinitService = TestBed.get(SelectBusinessuinitService);
    expect(service).toBeTruthy();
  });
});
