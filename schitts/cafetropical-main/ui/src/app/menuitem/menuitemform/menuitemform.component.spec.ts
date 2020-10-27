import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemformComponent } from './menuitemform.component';

describe('MenuitemformComponent', () => {
  let component: MenuitemformComponent;
  let fixture: ComponentFixture<MenuitemformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuitemformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuitemformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
