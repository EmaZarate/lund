import { TestBed } from '@angular/core/testing';

import { ProducerManagementService } from './producer-management.service';

describe('ProducerManagementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducerManagementServiceService = TestBed.get(ProducerManagementServiceService);
    expect(service).toBeTruthy();
  });
});
