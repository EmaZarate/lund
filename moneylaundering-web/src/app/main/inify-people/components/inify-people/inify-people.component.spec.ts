import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InifyPeopleComponent } from './inify-people.component';

describe('InifyPeopleComponent', () => {
  let component: InifyPeopleComponent;
  let fixture: ComponentFixture<InifyPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InifyPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InifyPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
