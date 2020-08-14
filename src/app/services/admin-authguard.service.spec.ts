import { TestBed } from '@angular/core/testing';

import { AdminAuthguardService } from './admin-authguard.service';

describe('AdminAuthguardService', () => {
  let service: AdminAuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
