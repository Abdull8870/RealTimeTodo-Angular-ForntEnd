import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { WebsocketsService } from './websockets.service'
import { TodoService } from './services/todo.service';
import { FriendService } from './services/friends.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


 id:string;
constructor(private authService: AuthService,private todoService:TodoService,
private friendsService:FriendService){}

ngOnInit(){

  let userId=localStorage.getItem("userId");
  this.authService.autoAuthUser();
  this.todoService.listenToLiveUpdates(userId);
  this.friendsService.listenLiveFriendUpdates(userId);

}

}
