import { TestBed } from '@angular/core/testing';

import { SendUserInfoInterceptor } from './send-user-info.interceptor';

describe('SendUserInfoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SendUserInfoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SendUserInfoInterceptor = TestBed.inject(SendUserInfoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
