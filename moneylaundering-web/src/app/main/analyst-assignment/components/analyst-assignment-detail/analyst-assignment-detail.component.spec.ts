import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystAssignmentDetailComponent } from './analyst-assignment-detail.component';

describe('AnalystAssignmentDetailComponent', () => {
  let component: AnalystAssignmentDetailComponent;
  let fixture: ComponentFixture<AnalystAssignmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystAssignmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystAssignmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
