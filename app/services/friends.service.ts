import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthData } from "../models/authdata.model";
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Activity } from '../models/activity.model';
import { Todo } from '../models/todo.model';
import { Friend } from '../models/friend.model';
import { WebsocketsService } from '../websockets.service';

const BACKEND_URL = environment.apiUrl + "/friend/";

@Injectable({ providedIn: "root" })
export class FriendService {

  private id:string;
  private allUsers = new Subject<{allUsers:any[]}>();
  private friendRequestSent = new Subject<{friendRequest:Friend[]}>();
  private friendRequestReceived = new Subject<{friendReqReceived:Friend[]}>();
  private unfriend = new Subject<{unfriend:boolean}>();

  constructor(private http: HttpClient, private router: Router,
  private toastr: ToastrService,private webSocketService:WebsocketsService) {}


  listenLiveFriendUpdates(id:string){

    this.webSocketService.listenLiveFriends(id).subscribe((result:{type:string,info:string,msg:string})=>{
       this.getAllUsers();
       if(result.msg=="friend"){
       this.toastr.info(result.info,result.type, {
       timeOut: 5000,
       });

       if(result.info.includes("Unfriend")){
         this.unfriend.next({unfriend:true});
       }
    }
    },error=>{

      this.getAllUsers();
      this.toastr.error(`Getting live friends update failed`, 'AN ERROR OCCURED', {
      timeOut: 5000,
      });
    });

  }


  getUnfiendAsObservable(){
    return this.unfriend.asObservable();
  }



 getfriendRequestSentAsObservable(){
   return this.friendRequestSent.asObservable();
 }


 getfriendRequestReceivedAsObservable(){
   return this.allUsers.asObservable();
 }


 getAllUsersAsObservable(){
   return this.allUsers.asObservable();
 }


  getAllUsers() {

    this.http.get<{message:"SUCCESS",data:any[]}>(BACKEND_URL + "get").
     subscribe(result=>{
       this.allUsers.next({allUsers:[...result.data]});

     },error=>{

       this.toastr.error(`Fetching friends failed`, 'AN ERROR OCCURED', {
       timeOut: 5000,
       });

    });
  }

  sendRequest(id:string,name:string,email:string){

   const data={
     name:name,
     _id:id,
     email:email
   };

  return this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "sendRequest",data);

  }

  getFriendRequestSent(){

    return this.http.get<{message:"SUCCESS",data:{friendRequestSent:Friend[],friendRequest:Friend[]}}>(BACKEND_URL + "getFriendRequestSent");

  }

  cancelFriendsRequest(userID:string,storedId:string){

    const data={
      userID:userID,
      storedId:storedId
    };

     return this.http.post<{message:"SUCCESS",data:any}>(BACKEND_URL + "cancelRequest",data);

  }

  acceptFriendRequest(userID:string,name:string,email:string,_id:string){

    const data={
      userID:userID,
      name:name,
      email:email,
      _id:_id
    };

  return  this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "acceptRequest",data);


  }

  rejectFriendRequest(userID:string,_id:string){
    const data={
      userID:userID,
      _id:_id
    };

    return this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "rejectRequest",data);

  }


  getFriends(){

    return this.http.get<{message:"SUCCESS",data:{friends:Friend[]}}>(BACKEND_URL + "getFriends");
  }

  unFriend(userID,storedId){
      const data={
        userID:userID,
        storedId:storedId
      }
      return this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "unFriend" ,data);
  }

  getall(){
      return this.http.get<{message:"SUCCESS",data:{friends:Friend[],friendRequest:Friend[],friendRequestSent:Friend[] }}>(BACKEND_URL + "all");
  }

}
