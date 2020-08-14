import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingOptionsComponent } from './sharing-options.component';

describe('SharingOptionsComponent', () => {
  let component: SharingOptionsComponent;
  let fixture: ComponentFixture<SharingOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
