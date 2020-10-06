import { TestBed } from '@angular/core/testing';

import { SelectDocumentstypeService } from './documentstype.service';

describe('SelectDocumentstypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectDocumentstypeService = TestBed.get(SelectDocumentstypeService);
    expect(service).toBeTruthy();
  });
});
