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

  /**
 * @description listen to live status of friends
 * @author Abdul Rahuman
 */


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

  /**
 * @description send data whenever a friend unfriends
 * @author Abdul Rahuman
 */


  getUnfiendAsObservable(){
    return this.unfriend.asObservable();
  }

  /**
 * @description sends the friend requests sent as an observable
 * @author Abdul Rahuman
 */

 getfriendRequestSentAsObservable(){
   return this.friendRequestSent.asObservable();
 }


 /**
* @description sends the friend requests received as an observable
* @author Abdul Rahuman
*/

 getfriendRequestReceivedAsObservable(){
   return this.allUsers.asObservable();
 }

 /**
* @description sends all the users as an asObservable
* @author Abdul Rahuman
*/

 getAllUsersAsObservable(){
   return this.allUsers.asObservable();
 }


 /**
* @description request server to get all users
* @author Abdul Rahuman
*/

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

  /**
 * @description request server to send a friend request
 * @author Abdul Rahuman
 */

  sendRequest(id:string,name:string,email:string){

   const data={
     name:name,
     _id:id,
     email:email
   };

  return this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "sendRequest",data);

  }

  /**
 * @description request server to get the friend requests sent
 * @author Abdul Rahuman
 */


  getFriendRequestSent(){

    return this.http.get<{message:"SUCCESS",data:{friendRequestSent:Friend[],friendRequest:Friend[]}}>(BACKEND_URL + "getFriendRequestSent");

  }

  /**
 * @description request server to revoke the friend requests sent
 * @author Abdul Rahuman
 */

  cancelFriendsRequest(userID:string,storedId:string){

    const data={
      userID:userID,
      storedId:storedId
    };

     return this.http.post<{message:"SUCCESS",data:any}>(BACKEND_URL + "cancelRequest",data);

  }

  /**
 * @description request server to accept the friend request
 * @author Abdul Rahuman
 */

  acceptFriendRequest(userID:string,name:string,email:string,_id:string){

    const data={
      userID:userID,
      name:name,
      email:email,
      _id:_id
    };

  return  this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "acceptRequest",data);


  }

  /**
 * @description request server to reject the friend request
 * @author Abdul Rahuman
 */


  rejectFriendRequest(userID:string,_id:string){
    const data={
      userID:userID,
      _id:_id
    };

    return this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "rejectRequest",data);

  }

  /**
 * @description request server to get the friends details
 * @author Abdul Rahuman
 */


  getFriends(){

    return this.http.get<{message:"SUCCESS",data:{friends:Friend[]}}>(BACKEND_URL + "getFriends");
  }

  /**
 * @description request server to unfriend
 * @author Abdul Rahuman
 */

  unFriend(userID,storedId){
      const data={
        userID:userID,
        storedId:storedId
      }
      return this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "unFriend" ,data);
  }

  /**
 * @description request server to get our friends details as well a request received and sent 
 * @author Abdul Rahuman
 */

  getall(){
      return this.http.get<{message:"SUCCESS",data:{friends:Friend[],friendRequest:Friend[],friendRequestSent:Friend[] }}>(BACKEND_URL + "all");
  }

}
