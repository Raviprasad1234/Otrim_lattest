import { TestBed } from '@angular/core/testing';

import { GofoundersService } from './gofounders.service';

describe('GofoundersService', () => {
  let service: GofoundersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GofoundersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
