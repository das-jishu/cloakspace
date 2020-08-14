import { TestBed } from '@angular/core/testing';

import { FeedbackServiceService } from './feedback-service.service';

describe('FeedbackServiceService', () => {
  let service: FeedbackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
