import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakePossitiveComponent } from './fake-possitive.component';

describe('FakePossitiveComponent', () => {
  let component: FakePossitiveComponent;
  let fixture: ComponentFixture<FakePossitiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakePossitiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakePossitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
