import { TestBed } from '@angular/core/testing';

import { DeleteprojectserviceService } from './deleteprojectservice.service';

describe('DeleteprojectserviceService', () => {
  let service: DeleteprojectserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteprojectserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
