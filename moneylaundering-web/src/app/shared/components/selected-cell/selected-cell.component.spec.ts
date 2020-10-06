import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCellComponent } from './selected-cell.component';

describe('SelectedCellComponent', () => {
  let component: SelectedCellComponent;
  let fixture: ComponentFixture<SelectedCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
