import { TestBed } from '@angular/core/testing';

import { Showprojectmanagerservice } from './showprojectmanagerservice.service';

describe('ShowprojectmanagerService', () => {
  let service: Showprojectmanagerservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Showprojectmanagerservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
