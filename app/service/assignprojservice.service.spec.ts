import { TestBed } from '@angular/core/testing';

import { AssignprojserviceService } from './assignprojservice.service';

describe('AssignprojserviceService', () => {
  let service: AssignprojserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignprojserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
