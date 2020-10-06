import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayListDetailComponent } from './gray-list-detail.component';

describe('GrayListDetailComponent', () => {
  let component: GrayListDetailComponent;
  let fixture: ComponentFixture<GrayListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrayListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrayListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
