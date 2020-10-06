import { TestBed } from '@angular/core/testing';

import { AnalystReAssignmentService } from './analyst-re-assignment.service';

describe('AnalystReAssignmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalystReAssignmentService = TestBed.get(AnalystReAssignmentService);
    expect(service).toBeTruthy();
  });
});
