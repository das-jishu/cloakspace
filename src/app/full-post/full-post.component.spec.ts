import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPostComponent } from './full-post.component';

describe('FullPostComponent', () => {
  let component: FullPostComponent;
  let fixture: ComponentFixture<FullPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
