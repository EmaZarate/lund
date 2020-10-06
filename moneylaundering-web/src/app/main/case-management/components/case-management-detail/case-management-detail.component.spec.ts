import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagementDetailComponent } from './case-management-detail.component';

describe('CaseManagementDetailComponent', () => {
  let component: CaseManagementDetailComponent;
  let fixture: ComponentFixture<CaseManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
