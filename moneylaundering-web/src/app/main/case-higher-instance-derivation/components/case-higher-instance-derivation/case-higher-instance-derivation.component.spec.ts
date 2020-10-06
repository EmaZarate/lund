import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseHigherInstanceDerivationComponent } from './case-higher-instance-derivation.component';

describe('CaseHigherInstanceDerivationComponent', () => {
  let component: CaseHigherInstanceDerivationComponent;
  let fixture: ComponentFixture<CaseHigherInstanceDerivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseHigherInstanceDerivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHigherInstanceDerivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
