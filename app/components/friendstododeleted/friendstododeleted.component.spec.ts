import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendstododeletedComponent } from './friendstododeleted.component';

describe('FriendstododeletedComponent', () => {
  let component: FriendstododeletedComponent;
  let fixture: ComponentFixture<FriendstododeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendstododeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendstododeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
