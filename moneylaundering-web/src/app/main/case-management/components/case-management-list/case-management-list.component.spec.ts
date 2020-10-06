import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagementListComponent } from './case-management-list.component';

describe('CaseManagementListComponent', () => {
  let component: CaseManagementListComponent;
  let fixture: ComponentFixture<CaseManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
