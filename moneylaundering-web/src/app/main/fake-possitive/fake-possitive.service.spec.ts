import { TestBed } from '@angular/core/testing';

import { FakePossitiveService } from './fake-possitive.service';

describe('FakePossitiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakePossitiveService = TestBed.get(FakePossitiveService);
    expect(service).toBeTruthy();
  });
});
