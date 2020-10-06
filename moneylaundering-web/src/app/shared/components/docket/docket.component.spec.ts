import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocketComponent } from './docket.component';

describe('DocketComponent', () => {
  let component: DocketComponent;
  let fixture: ComponentFixture<DocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
