import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendstodoEditComponent } from './friendstodo-edit.component';

describe('FriendstodoEditComponent', () => {
  let component: FriendstodoEditComponent;
  let fixture: ComponentFixture<FriendstodoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendstodoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendstodoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
