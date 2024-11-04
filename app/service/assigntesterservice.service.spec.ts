import { TestBed } from '@angular/core/testing';

import { AssigntesterserviceService } from './assigntesterservice.service';

describe('AssigntesterserviceService', () => {
  let service: AssigntesterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssigntesterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
