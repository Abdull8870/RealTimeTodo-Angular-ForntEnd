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

const BACKEND_URL = environment.apiUrl + "/todo/";

@Injectable({ providedIn: "root" })
export class TodoService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private ResetuserId: string;
  private authStatusListener = new Subject<boolean>();
  private resetToken:string;
  private allActivity = new Subject<{allActivity:Todo[]}>();
  private userName:string;

  constructor(private http: HttpClient, private router: Router,
  private toastr: ToastrService,private webSocketService:WebsocketsService) {

  }


  /**
 * @description function for listening live update of todo list
 * @author Abdul Rahuman
 */

  listenToLiveUpdates(id:string){

    this.webSocketService.listenLivetodoUpdate(id).subscribe((result:{information:string,msg:string})=>{
       this.getActivity();
       if(result.msg=="activity"){
       this.toastr.success(result.information,'An update Has been Made', {
       timeOut: 3000,
       });
     }
    },error=>{
      this.displayError("Some internal error while fetching live updates");
      this.getActivity();
    });

  }


  /**
 * @description Make's a request to the server to add a new todo list
 * @author Abdul Rahuman
 */


  addActivity(activity:Activity) {

    this.userName=localStorage.getItem("name");
    this.http.post<{message:string}>(BACKEND_URL + "add", activity).subscribe(
      () => {

        this.getActivity();
        let userId=localStorage.getItem("userId");
        let updateDetails = {
          userId:userId,
          information:`${this.userName} Has made an Update on his todo list`
        };
        this.webSocketService.emitLiveActivity(updateDetails);
        this.displaySuccess(`A New todo list has been added Successfully`);
      },
      error => {
        this.displayError("Adding a new Todo list failed");
        this.getActivity();

      }
    );
  }


  /**
 * @description Returns all todo list as a observable when called
 * @author Abdul Rahuman
 */


  getAllActivity(){
    return this.allActivity.asObservable();
  }


  /**
 * @description request to the server to get all todo list
 * @author Abdul Rahuman
 */

  getActivity() {


    this.http.get<{ message:string,allActivity:Todo[]}>(BACKEND_URL + "get").subscribe(
      (result) => {
        this.allActivity.next({allActivity:[...result.allActivity]})

      },
      error => {
        this.displayError("Fetching activities failed");
        this.allActivity.next({allActivity:[]});
      }
    );
  }

  /**
 * @description request server to a sub item
 * @author Abdul Rahuman
 */


  addSubActivity(subItem:string,actId:string,listId:string){
    this.userName=localStorage.getItem("name");
    const data={
      subItem:subItem,
      _id:actId,
      itemId:listId
    };
    this.http.post(BACKEND_URL + "addSubItem", data).subscribe((result)=>{



    this.getActivity();

    let userId=localStorage.getItem("userId");
    let updateDetails = {
      userId:userId,
      information:`${this.userName} Has made an Update on his todo list`
    };
    this.webSocketService.emitLiveActivity(updateDetails);
    this.displaySuccess(`A New Sub Item has been added Successfully`);

    },
  error=>{
    this.displayError("Adding a new sub item failed");
    this.getActivity();

  });
  }

  /**
 * @description request server to add an item on a todo list
 * @author Abdul Rahuman
 */

  addNewList(list:string,_id:string){
    this.userName=localStorage.getItem("name");
    const data={
      list:list,
      _id:_id
    };
    this.http.post(BACKEND_URL+ "addList",data).subscribe((result)=>{

    this.getActivity();
    let userId=localStorage.getItem("userId");
    let updateDetails = {
      userId:userId,
      information:`${this.userName} Has made an Update on his todo list`
    };
    this.webSocketService.emitLiveActivity(updateDetails);
    this.displaySuccess(`A New Item has been added to  the list Successfully`);
    },
  error=>{
    this.displayError("Adding a new list failed");
    this.getActivity();

  });
  }

  /**
 * @description request server to mark an item done
 * @author Abdul Rahuman
 */

  markListDone(activityId:string,listId:string){
    this.userName=localStorage.getItem("name");
    const data={
      activityId:activityId,
      listId:listId
    };
    let userId=localStorage.getItem("userId");
    this.http.post(BACKEND_URL+ "listDone",data).subscribe(data=>{

      this.getActivity();
      let updateDetails = {
        userId:userId,
        information:`${this.userName} Has made an Update on his todo list`
      };
      this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The Item has been Marked as Done`);
    },error=>{
      this.displayError("Marking list Done failed");
      this.getActivity();
    });


  }

  /**
 * @description request server to mark an item open
 * @author Abdul Rahuman
 */


  markListOpen(activityId:string,listId:string){
    this.userName=localStorage.getItem("name");
    const data={
      activityId:activityId,
      listId:listId
    };
    let userId=localStorage.getItem("userId");
    this.http.post(BACKEND_URL+ "listOpen",data).subscribe(data=>{

      this.getActivity();
      let updateDetails = {
        userId:userId,
        information:`${this.userName} Has made an Update on his todo list`
      };
      this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The Item has been reopened`);
    },error=>{
      this.displayError("Marking list open failed");
      this.getActivity();
    });


  }

  /**
 * @description request server to mark a sub item done
 * @author Abdul Rahuman
 */

   markSubListDone(activityId:string,listId:string,subListId:string){
   this.userName=localStorage.getItem("name");
   const data={
     activityId:activityId,
     listId:listId,
     subListId:subListId
   };
   let userId=localStorage.getItem("userId");

   this.http.post(BACKEND_URL+ "subListDone",data).subscribe(result=>{


     this.getActivity();
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
     this.displaySuccess(`The Sub Item has been marked Done`);
   },
   error=>{
     this.displayError("Marking sub list Done failed");
     this.getActivity();

   });

  }

  /**
 * @description request server to mark a sub item open
 * @author Abdul Rahuman
 */

  markSubListOpen(activityId:string,listId:string,subListId:string){
    this.userName=localStorage.getItem("name");
  const data={
    activityId:activityId,
    listId:listId,
    subListId:subListId
  };
    let userId=localStorage.getItem("userId");

  this.http.post(BACKEND_URL+ "subListOpen",data).subscribe(result=>{



    this.getActivity();
    let updateDetails = {
      userId:userId,
      information:`${this.userName} Has made an Update on his todo list`
    };
    this.webSocketService.emitLiveActivity(updateDetails);
    this.displaySuccess(`The Sub Item has been reopened`);
  },
  error=>{
    this.displayError("Marking sub list open failed");
    this.getActivity();

  });

 }

 /**
* @description request server to mark an todo list as completed
* @author Abdul Rahuman
*/

 markActivityCompleted(id:string){
   this.userName=localStorage.getItem("name");
   const data={
     activityId:id
   };
   let userId=localStorage.getItem("userId");
   this.http.post(BACKEND_URL+ "activityDone",data).subscribe(result=>{
     this.getActivity();


     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The todo list has been marked as completed`);
   },
   error=>{

     this.displayError("Marking the activity complete failed");
     this.getActivity();

   });

 }

 /**
* @description request server to restore a todo list
* @author Abdul Rahuman
*/


 restoreActivity(id:string){
  this.userName=localStorage.getItem("name");
   const data={
     activityId:id
   };
     let userId=localStorage.getItem("userId");
   this.http.post(BACKEND_URL+ "restoreActivity",data).subscribe(result=>{
     this.getActivity();
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
     this.displaySuccess(`The todo list has been restored Successfully`);
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


 openActivity(id:string){
   this.userName=localStorage.getItem("name");
   const data={
     activityId:id
   };
   let userId=localStorage.getItem("userId");
   this.http.post(BACKEND_URL+ "openActivity",data).subscribe(result=>{
     this.getActivity();
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
     this.displaySuccess(`The todo list has been reopened Successfully`);
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


  undo(id:string){
    this.userName=localStorage.getItem("name");
   const data={
     id:id
   };
     let userId=localStorage.getItem("userId");
   this.http.post<{message:string,data:any[],info:string}>(BACKEND_URL+ "undo",data).subscribe(result=>{

     this.getActivity();
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);

     if(result.info=='last'){
       this.toastr.info('This is first item of the List',`There's no Item to Undo`, {
       timeOut: 3000,
       });
     } else {
        this.displaySuccess(`The last action done on the todo list is revoked`);
     }
   },
   error=>{
     this.getActivity();
     this.displayError(`Some Internal error occured`);
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

 /**
* @description Triggers notification on success
* @author Abdul Rahuman
*/

 displaySuccess(content:string) {
   this.toastr.success(`${content}`, 'SUCCESS', {
   timeOut: 5000,
   });

 }

}
