import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystAssignmentListComponent } from './analyst-assignment-list.component';

describe('AnalystAssignmentListComponent', () => {
  let component: AnalystAssignmentListComponent;
  let fixture: ComponentFixture<AnalystAssignmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
