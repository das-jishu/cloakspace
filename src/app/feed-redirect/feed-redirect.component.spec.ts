import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedRedirectComponent } from './feed-redirect.component';

describe('FeedRedirectComponent', () => {
  let component: FeedRedirectComponent;
  let fixture: ComponentFixture<FeedRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
