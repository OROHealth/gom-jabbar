import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemviewComponent } from './menuitemview.component';

describe('MenuitemviewComponent', () => {
  let component: MenuitemviewComponent;
  let fixture: ComponentFixture<MenuitemviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuitemviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuitemviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
