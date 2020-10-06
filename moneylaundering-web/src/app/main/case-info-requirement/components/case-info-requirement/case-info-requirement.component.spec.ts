import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseInfoRequirementComponent } from './case-info-requirement.component';

describe('CaseInfoRequirementComponent', () => {
  let component: CaseInfoRequirementComponent;
  let fixture: ComponentFixture<CaseInfoRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseInfoRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseInfoRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
