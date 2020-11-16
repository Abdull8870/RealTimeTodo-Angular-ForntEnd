import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';
import { Activity } from '../../models/activity.model';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { FriendService } from '../../services/friends.service';
import { AuthService } from '../../services/auth.service';
import { Friend } from '../../models/friend.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebsocketsService } from '../../websockets.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  totalFriends:number;
  totalfriendRequest:number;
  totalfriendrequestsent:number;
  rejectedId:string[];
  allActivity:any[]=["Abdul","Abdul","Abdul","Abdul","Abdul"];
  loading:boolean;
  friends:boolean;
  search:boolean;
  friendRequest:boolean;
  friendRequestSent:boolean;
  allUsersListDetails:{_id:string,name:string,email:string}[]=[];
  friendRequestSentUsers:Friend[]=[];
  friendRequestReceived:Friend[]=[];
  friendsList:Friend[]=[];
  allUsersList:{_id:string,name:string,email:string}[]=[];
  myName:string;

  constructor(private friendsService:FriendService,
  private router: Router,private authService:AuthService,
  private toastr: ToastrService,private webSocketService:WebsocketsService) { }

  ngOnInit(): void {
    this.myName=localStorage.getItem("name");
    this.loading=true;
    this.friendsService.getAllUsers();
    this.friendsService.getAllUsersAsObservable().subscribe(result=>{
      this.loading=true;
      this.friendRequest=false;
      this.friendRequestSent=false;
      this.friends=false;
      this.search=false;
      let allUser=[...result.allUsers];
      this.allUsersList=allUser.map((object)=>({
       name:object.firstName+' '+object.lastName,
       _id:object._id,
       email:object.email
        }));
      this.onInvalidId();
    },error=>{
       this.displayError(`Some Internal Error occured try after sometime`);
       this.router.navigate(['/todo']);
    });



  }




  onInvalidId(){
      this.rejectedId=[];
      let id=this.authService.getUserId();
      this.friendsService.getall().subscribe(result=>{
      let friends:Friend[]=result.data.friends;
      let friendRequestSent:Friend[]=result.data.friendRequestSent;
      let friendRequestReceived:Friend[]=result.data.friendRequest;
      this.totalFriends=friends.length;
      this.totalfriendRequest=friendRequestReceived.length;
      this.totalfriendrequestsent=friendRequestSent.length;
      friends.forEach(element => {
        this.rejectedId.push(element.userID);
      });
      friendRequestSent.forEach(element => {
        this.rejectedId.push(element.userID);
      });

      friendRequestReceived.forEach(element => {
          this.rejectedId.push(element.userID);
      });

    },error=>{
      this.loading=false;
       this.displayError(`Fetching Data failed`);
    });
      this.rejectedId.push(id);
      this.loading=false;
  }



  onTodoList(id:string){
    localStorage.setItem("friendId",id);
    this.router.navigate(['/Ftodo',id]);
  }


  onFriends(){
    this.loading=true;
    this.search=false;
    this.friendRequest=false;
    this.friendRequestSent=false;
    this.friendsService.getFriends().subscribe(result=>{
      this.friendsList=[...result.data.friends];
      this.friends=true;
      this.onInvalidId();
    },error=>{
        this.displayError(`Fetching Data failed`);
        this.onInvalidId();
    });



  }

  onFriendRequests(){
    this.loading=true;
    this.friends=false;
    this.search=false;
    this.friendRequestSent=false;
    this.friendRequest=true;
    this.friendsService.getFriendRequestSent().subscribe(result=>{

        this.friendRequestReceived=[...result.data.friendRequest];
        this.onInvalidId();
      },error=>{

      this.loading=false;
      this.displayError(`Fetching Data failed`);

     });

  }

  onSearchFriend(form:NgForm){
   const name=form.value.friend.toLowerCase();

   this.allUsersListDetails=this.allUsersList.filter((x)=>{

     if(x.name.toLowerCase().includes(name) && !this.rejectedId.includes(x._id)){
       return x;
     }
   });
   this.friends=false;
   this.friendRequest=false;
   this.friendRequestSent=false;
   this.search=true;
   form.reset();
  }

  onSendRequest(id:string,name:string,email:string){

    if(!this.rejectedId.includes(id)){
      this.friendsService.sendRequest(id,name,email).subscribe(result=>{
        this.onFriendRequestSent();
        let updateDetails={
          userId:id,
          type:"FRIEND REQUEST",
          info:`${this.myName} has sent you a friend Request`
        };
      this.webSocketService.emitLiveFriendsUpdate(updateDetails);
      },error=>{
            this.displayError(`Sending Friend request failed`);
            this.onFriendRequestSent();
      });
    }
    else {

      this.toastr.error('You already have friend request from the user', 'AN ERROR OCCURED', {
      timeOut: 3000,
      });

    }


  }

  onFriendRequestSent(){

    this.friends=false;
    this.search=false;
    this.friendRequest=false;
    this.friendRequestSent=true;

    this.friendsService.getFriendRequestSent().subscribe(result=>{
      this.friendRequestSentUsers=[...result.data.friendRequestSent];
      this.onInvalidId();

    },error=>{

      this.loading=false;
      this.displayError(`Cancel Friend request failed`);
      this.onInvalidId();

   });


  }

  onCancelFriendRequest(userID:string,storedId:string){

    this.friendsService.cancelFriendsRequest(userID,storedId).subscribe(result=>{

      this.onFriendRequestSent();
      let updateDetails={
        userId:userID,
        type:"FRIEND REQUEST REVOKED",
        info:`${this.myName} has Rvoked the friend Request sent to you`
      };
      this.webSocketService.emitLiveFriendsUpdate(updateDetails);
    },error=>{


       this.onFriendRequestSent();
       this.displayError(`Cancel Friend request failed`);

    });

  }

  onAccept(userID:string,name:string,email:string,_id:string){

    this.friendsService.acceptFriendRequest(userID,name,email,_id).subscribe(result=>{
      this.onFriendRequests();
      let updateDetails={
        userId:userID,
        type:"FRIEND REQUEST ACCEPTED",
        info:`${this.myName} has accepted your friend Request`
      };
       this.webSocketService.emitLiveFriendsUpdate(updateDetails);
    },error=>{

       this.onFriendRequests();
       this.displayError(`Accept Friend request failed`);

    });

    }

    onRejectFriendReqest(userID:string,_id:string){
      this.friendsService.rejectFriendRequest(userID,_id).subscribe(result=>{
        this.onFriendRequests();
        let updateDetails={
          userId:userID,
          type:"REJECT REQUEST",
          info:`${this.myName} has rejected your friend Request`
        };
      this.webSocketService.emitLiveFriendsUpdate(updateDetails);
      },error=>{
        this.onFriendRequests();
         this.displayError(`Reject Friend request failed`);
      });

    }

    onUnfriend(userID:string,_id:string){

      this.friendsService.unFriend(userID,_id).subscribe(result=>{
        this.onFriends();
        let updateDetails={
          userId:userID,
          type:"UNFRIEND",
          info:`${this.myName} has Unfriend You`
        };
       this.webSocketService.emitLiveFriendsUpdate(updateDetails);
       localStorage.removeItem("fId");
      },error=>{
         this.onFriends();
         this.displayError(`Unfriend Action failed`);
      });
    }

    commonLoading(){
        this.loading=true;
    }

    displayError(content:string) {
      this.toastr.error(`${content}`, 'AN ERROR OCCURED', {
      timeOut: 5000,
      });

    }
}
