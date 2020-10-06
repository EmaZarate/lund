import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusinessunitComponent } from './select-businessunit.component';

describe('SelectBusinessunitComponent', () => {
  let component: SelectBusinessunitComponent;
  let fixture: ComponentFixture<SelectBusinessunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBusinessunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBusinessunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
