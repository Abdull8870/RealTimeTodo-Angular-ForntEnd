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
import { WebsocketsService } from '../websockets.service';

const BACKEND_URL = environment.apiUrl + "/friendstodolist/";

@Injectable({ providedIn: "root" })
export class FriendsTodoService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private ResetuserId: string;
  private authStatusListener = new Subject<boolean>();
  private resetToken:string;
  private friendId:string;
  private allActivity = new Subject<{allActivity:Todo[]}>();


  constructor(private http: HttpClient, private router: Router,
  private toastr: ToastrService,private webSocketService:WebsocketsService) {}


  /**
 * @description Make's a request to the server to add a new todo list
 * @author Abdul Rahuman
 */

  addActivity(activity:Activity) {

    this.http.post<{message:string}>(BACKEND_URL + "add", activity).subscribe(
      () => {
        this.toastr.success('Yes','Success', {
        timeOut: 3000,
        });
        this.getActivity();
      },
      error => {

        this.toastr.error(`${error.error.message}`, 'AN ERROR OCCURED', {
        timeOut: 3000,
        });
      }
    );
  }

  storeUserId(id:string){
    this.friendId=id;
  }

  /**
 * @description Returns all todo list as a observable when called
 * @author Abdul Rahuman
 */


  getAllActivity(){
    return this.allActivity.asObservable();
  }


  /**
 * @description request to the server to get all todo list of the friend
 * @author Abdul Rahuman
 */

  getActivity() {

    const queryParams= `?friendId=${this.friendId}`;
    this.http.get<{ message:string,allActivity:Todo[]}>(BACKEND_URL + "get" +queryParams).subscribe(
      (result) => {

        this.allActivity.next({allActivity:[...result.allActivity]})

      },
      error => {
        this.displayError(error.error.message);
        this.router.navigate(['/friends']);

      }
    );
  }

  /**
 * @description request server to a sub item
 * @author Abdul Rahuman
 */



  addSubActivity(subItem:string,actId:string,listId:string){
    const queryParams= `?friendId=${this.friendId}`;
    const data={
      subItem:subItem,
      _id:actId,
      itemId:listId
    };
    this.http.post(BACKEND_URL + "addSubItem", data).subscribe((result)=>{

    this.getActivity();

    },
  error=>{


  });
  }

  /**
 * @description request server to add an item on a todo list
 * @author Abdul Rahuman
 */


  addNewList(list:string,_id:string){
    const queryParams= `?friendId=${this.friendId}`;
    const data={
      list:list,
      _id:_id
    };
    this.http.post(BACKEND_URL+ "addList",data).subscribe((result)=>{

      this.getActivity();
    },
  error=>{


  });
  }

  /**
 * @description request server to mark an item done
 * @author Abdul Rahuman
 */


  markListDone(activityId:string,listId:string,information:string){
    const queryParams= `?friendId=${this.friendId}`;
    const data={
      activityId:activityId,
      listId:listId
    };
    this.http.post(BACKEND_URL+ "listDone"+queryParams,data).subscribe(data=>{

      this.getActivity();

      let updateDetails = {
        friend:this.friendId,
        information:information
      };

      this.webSocketService.emitFriendsUpdates(updateDetails);

    },error=>{

      this.displayError("Marking List Done failed")
      this.getActivity();

    });


  }

  /**
 * @description request server to mark an item open
 * @author Abdul Rahuman
 */


  markListOpen(activityId:string,listId:string,information:string){
    const queryParams= `?friendId=${this.friendId}`;
    const data={
      activityId:activityId,
      listId:listId
    };
    this.http.post(BACKEND_URL+ "listOpen" + queryParams,data).subscribe(data=>{

      this.getActivity();
      let updateDetails = {
        friend:this.friendId,
        information:information
      };
      this.webSocketService.emitFriendsUpdates(updateDetails);
    },error=>{

      this.displayError("Marking List open failed")
      this.getActivity();

    });


  }

  /**
 * @description request server to mark a sub item done
 * @author Abdul Rahuman
 */


   markSubListDone(activityId:string,listId:string,subListId:string,information:string){

   const queryParams= `?friendId=${this.friendId}`;
   const data={
     activityId:activityId,
     listId:listId,
     subListId:subListId
   };

   this.http.post(BACKEND_URL+ "subListDone" + queryParams,data).subscribe(result=>{

     this.getActivity();
     let updateDetails = {
       friend:this.friendId,
       information:information
     };

     this.webSocketService.emitFriendsUpdates(updateDetails);
   },
   error=>{

     this.displayError("Marking Sub List Done failed")
     this.getActivity();

   });

  }

  /**
 * @description request server to mark a sub item open
 * @author Abdul Rahuman
 */


  markSubListOpen(activityId:string,listId:string,subListId:string,information:string){
   const queryParams= `?friendId=${this.friendId}`;
   const data={
    activityId:activityId,
    listId:listId,
    subListId:subListId
  };

  this.http.post(BACKEND_URL+ "subListOpen" + queryParams,data).subscribe(result=>{

    this.getActivity();
    let updateDetails = {
      friend:this.friendId,
      information:information
    };

    this.webSocketService.emitFriendsUpdates(updateDetails);
  },
  error=>{

    this.displayError("Open sub item failed")
    this.getActivity();

  });

 }

 /**
* @description request server to mark an todo list as completed
* @author Abdul Rahuman
*/


 markActivityCompleted(id:string,information:string){
   const queryParams= `?friendId=${this.friendId}`;
   const data={
     activityId:id
   };
   this.http.post(BACKEND_URL+ "activityDone" + queryParams,data).subscribe(result=>{
     this.getActivity();
     let updateDetails = {
       friend:this.friendId,
       information:information
     };

     this.webSocketService.emitFriendsUpdates(updateDetails);
   },
   error=>{

     this.displayError("Marking the activity Complete failed")
     this.getActivity();

   });

 }

 /**
* @description request server to restore a todo list
* @author Abdul Rahuman
*/

 restoreActivity(id:string,information:string){
   const queryParams= `?friendId=${this.friendId}`;
   const data={
     activityId:id
   };
   this.http.post(BACKEND_URL+ "restoreActivity" +queryParams ,data).subscribe(result=>{
     this.getActivity();
     let updateDetails = {
       friend:this.friendId,
       information:information
     };

     this.webSocketService.emitFriendsUpdates(updateDetails);
   },
   error=>{

     this.displayError("Restoring the activity failed")
     this.getActivity();

   });

 }

 /**
* @description request server to reopen a todo list
* @author Abdul Rahuman
*/


 openActivity(id:string,information:string){
   const queryParams= `?friendId=${this.friendId}`;
   const data={
     activityId:id
   };
   this.http.post(BACKEND_URL+ "openActivity" +queryParams ,data).subscribe(result=>{
     this.getActivity();
     let updateDetails = {
       friend:this.friendId,
       information:information
     };

     this.webSocketService.emitFriendsUpdates(updateDetails);
   },
   error=>{
     this.displayError("Opening the activity failed")
     this.getActivity();

   });
 }


 /**
* @description request server to undo the last modified item
* @author Abdul Rahuman
*/



  undo(id:string,information:string){
   const queryParams= `?friendId=${this.friendId}`;
   const data={
     id:id
   };
   this.http.post<{message:string,data:any[],info:string}>(BACKEND_URL+ "undo" +queryParams,data).subscribe(result=>{

     this.getActivity();
     let updateDetails = {
       friend:this.friendId,
       information:information
     };

     this.webSocketService.emitFriendsUpdates(updateDetails);

     if(result.info=='last'){
       this.toastr.info('This is first item of the List',`There's no Item to Undo`, {
       timeOut: 3000,
       });
     }
   },
   error=>{

     this.toastr.error(`${error.error.message}`, 'AN ERROR OCCURED', {
     timeOut: 3000,
     });
     this.getActivity();
   });
 }


 /**
* @description Triggers notification when there's an error
* @author Abdul Rahuman
*/


 displayError(content:string) {
   this.toastr.error(`${content}`, 'AN ERROR OCCURED', {
   timeOut: 5000,
   });

 }

}
