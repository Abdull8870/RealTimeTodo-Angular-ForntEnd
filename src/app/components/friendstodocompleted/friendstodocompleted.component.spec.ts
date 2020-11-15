import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendstodocompletedComponent } from './friendstodocompleted.component';

describe('FriendstodocompletedComponent', () => {
  let component: FriendstodocompletedComponent;
  let fixture: ComponentFixture<FriendstodocompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendstodocompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendstodocompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
