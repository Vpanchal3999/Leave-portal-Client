import { TestBed } from '@angular/core/testing';

import { ExampleInterceptor } from './example-interceptor.interceptor';

describe('ExampleInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ExampleInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ExampleInterceptor= TestBed.inject(ExampleInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
