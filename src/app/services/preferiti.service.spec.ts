import { TestBed } from '@angular/core/testing';

import { PreferitiService } from './preferiti.service';

describe('PreferitiService', () => {
  let service: PreferitiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferitiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
