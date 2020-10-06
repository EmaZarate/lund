import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequirementComponent } from './info-requirement.component';

describe('InfoRequirementComponent', () => {
  let component: InfoRequirementComponent;
  let fixture: ComponentFixture<InfoRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
