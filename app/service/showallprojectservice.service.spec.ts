import { TestBed } from '@angular/core/testing';

import { ShowallprojectserviceService } from './showallprojectservice.service';

describe('ShowallprojectserviceService', () => {
  let service: ShowallprojectserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowallprojectserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
