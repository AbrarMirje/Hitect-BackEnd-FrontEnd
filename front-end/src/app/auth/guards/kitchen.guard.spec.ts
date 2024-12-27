import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { kitchenGuard } from './kitchen.guard';

describe('kitchenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => kitchenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
