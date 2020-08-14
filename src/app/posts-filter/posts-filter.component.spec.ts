import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFilterComponent } from './posts-filter.component';

describe('PostsFilterComponent', () => {
  let component: PostsFilterComponent;
  let fixture: ComponentFixture<PostsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
