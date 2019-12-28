import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaliedViewComponent } from './detalied-view.component';

describe('DetaliedViewComponent', () => {
  let component: DetaliedViewComponent;
  let fixture: ComponentFixture<DetaliedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaliedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaliedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
