import { TestBed } from '@angular/core/testing';

import { LinkComponentService } from './link-component.service';

describe('LinkComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkComponentService = TestBed.get(LinkComponentService);
    expect(service).toBeTruthy();
  });
});
