import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpendzComponent } from './user-spendz.component';

describe('UserSpendzComponent', () => {
  let component: UserSpendzComponent;
  let fixture: ComponentFixture<UserSpendzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSpendzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSpendzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
