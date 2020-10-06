import { TestBed } from '@angular/core/testing';

import { SelectedCellService } from './selected-cell.service';

describe('SelectedCellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedCellService = TestBed.get(SelectedCellService);
    expect(service).toBeTruthy();
  });
});
