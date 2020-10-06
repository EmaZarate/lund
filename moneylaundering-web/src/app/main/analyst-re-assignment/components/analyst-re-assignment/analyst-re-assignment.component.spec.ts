import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystReAssignmentComponent } from './analyst-re-assignment.component';

describe('AnalystReAssignmentComponent', () => {
  let component: AnalystReAssignmentComponent;
  let fixture: ComponentFixture<AnalystReAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystReAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystReAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
