import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeExpirationComponent } from './change-expiration.component';

describe('ChangeExpirationComponent', () => {
  let component: ChangeExpirationComponent;
  let fixture: ComponentFixture<ChangeExpirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeExpirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeExpirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
