import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDataPersonComponent } from './generic-data-person.component';

describe('GenericDataPersonComponent', () => {
  let component: GenericDataPersonComponent;
  let fixture: ComponentFixture<GenericDataPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericDataPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDataPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
