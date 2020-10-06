import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponentComponent } from './title-component.component';

describe('TitleComponentComponent', () => {
  let component: TitleComponentComponent;
  let fixture: ComponentFixture<TitleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
