import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewComponent } from './customerview.component';

describe('CustomerviewComponent', () => {
  let component: CustomerviewComponent;
  let fixture: ComponentFixture<CustomerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
