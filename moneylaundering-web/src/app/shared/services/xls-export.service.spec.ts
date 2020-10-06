import { TestBed } from '@angular/core/testing';

import { XlsExportService } from './xls-export.service';

describe('XlsExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XlsExportService = TestBed.get(XlsExportService);
    expect(service).toBeTruthy();
  });
});
