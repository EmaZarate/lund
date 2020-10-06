import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayListGridComponent } from './gray-list-grid.component';

describe('GrayListGridComponent', () => {
  let component: GrayListGridComponent;
  let fixture: ComponentFixture<GrayListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrayListGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrayListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
