import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseUnderestimatingComponent } from './case-underestimating.component';

describe('CaseUnderestimatingComponent', () => {
  let component: CaseUnderestimatingComponent;
  let fixture: ComponentFixture<CaseUnderestimatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseUnderestimatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseUnderestimatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
