import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystDevolutionComponent } from './analyst-devolution.component';

describe('AnalystDevolutionComponent', () => {
  let component: AnalystDevolutionComponent;
  let fixture: ComponentFixture<AnalystDevolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystDevolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystDevolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
