import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendstodoeditComponent } from './friendstodoedit.component';

describe('FriendstodoeditComponent', () => {
  let component: FriendstodoeditComponent;
  let fixture: ComponentFixture<FriendstodoeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendstodoeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendstodoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
