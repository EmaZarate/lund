import { TestBed } from '@angular/core/testing';

import { InifyPeopleService } from './inify-people.service';

describe('InifyPeopleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InifyPeopleService = TestBed.get(InifyPeopleService);
    expect(service).toBeTruthy();
  });
});
