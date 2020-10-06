import { TestBed } from '@angular/core/testing';

import { ChangeExpirationService } from './change-expiration.service';

describe('ChangeExpirationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeExpirationService = TestBed.get(ChangeExpirationService);
    expect(service).toBeTruthy();
  });
});
