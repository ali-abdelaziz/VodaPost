import { TestBed } from '@angular/core/testing';

import { CachService } from './cach.service';

describe('CachService', () => {
  let service: CachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
