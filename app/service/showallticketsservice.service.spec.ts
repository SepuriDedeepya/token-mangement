import { TestBed } from '@angular/core/testing';

import { ShowallticketsserviceService } from './showallticketsservice.service';

describe('ShowallticketsserviceService', () => {
  let service: ShowallticketsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowallticketsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
