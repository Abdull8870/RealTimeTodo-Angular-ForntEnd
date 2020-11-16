import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendstodolistComponent } from './friendstodolist.component';

describe('FriendstodolistComponent', () => {
  let component: FriendstodolistComponent;
  let fixture: ComponentFixture<FriendstodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendstodolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendstodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
