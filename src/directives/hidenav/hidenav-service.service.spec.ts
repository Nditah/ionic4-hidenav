import { TestBed } from '@angular/core/testing';

import { HidenavService } from './hidenav-service.service';

describe('HidenavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HidenavService = TestBed.get(HidenavService);
    expect(service).toBeTruthy();
  });
});
