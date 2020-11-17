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

const BACKEND_URL = environment.apiUrl + "/editfriendslist/";

@Injectable({ providedIn: "root" })
export class FriendsEditService {

  private id:string;
  private activity = new Subject<{Activity:Todo}>();
  private fId:string;
  private friendId:string;


  constructor(private http: HttpClient, private router: Router,
  private toastr: ToastrService,private webSocketService:WebsocketsService) {
    this.fId=localStorage.getItem("fId");
  }

  /**
 * @description Sends the todo list for edit as an observable when called
 * @author Abdul Rahuman
 */


  getActivityAsObervable(){
    return this.activity.asObservable();
  }

  storeUserId(id:string){
    this.friendId=id;
  }

  /**
 * @description request the server to get the todo list details to edit
 * @author Abdul Rahuman
 */


  getEditActivity(id:string) {

    const queryParams = `?id=${id}&friendId=${this.fId}`;

    this.http.get<{message:"SUCCESS",data:Todo}>(BACKEND_URL + "get" + queryParams).
     subscribe(result=>{

     this.activity.next({Activity:result.data});
     },error=>{

       this.displayError(`Fetching activity failed`);
       this.router.navigate(['/Ftodo',this.fId]);

    });
  }


  /**
 * @description request the server to change the title of the todo list
 * @author Abdul Rahuman
 */



  changeTitle(id:string,title:string,information:string) {

    const data={
      id:id,
      title:title
    };
    const queryParams= `?friendId=${this.friendId}`;

    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "title" + queryParams,data).
     subscribe(result=>{

     this.getEditActivity(id);
     let updateDetails = {
       friend:this.fId,
       information:information
     };

     this.webSocketService.emitFriendsUpdates(updateDetails);
     },error=>{

       this.displayError(`Changing the title failed`);
       this.getEditActivity(id);

    });

  }

  /**
 * @description request the server to change the description of the todo list
 * @author Abdul Rahuman
 */

  changeDesc(id:string,desc:string,information:string){
    const data={
      id:id,
      desc:desc
    };
    const queryParams= `?friendId=${this.friendId}`;

    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "desc"+ queryParams,data).
     subscribe(result=>{

     this.getEditActivity(id);
     let updateDetails = {
       friend:this.fId,
       information:information
     };
     this.webSocketService.emitFriendsUpdates(updateDetails);
     },error=>{

       this.displayError(`Changing the description failed`);
       this.getEditActivity(id);

    });
  }


  /**
 * @description request the server to change the item name in the todo list
 * @author Abdul Rahuman
 */


  changeItemName(id:string,itemId:string,itemName:string,information:string){
    const data={
      id:id,
      itemId:itemId,
      itemName:itemName
    };
    const queryParams= `?friendId=${this.friendId}`;

    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "item" + queryParams,data).
     subscribe(result=>{

     this.getEditActivity(id);
     let updateDetails = {
       friend:this.fId,
       information:information
     };
     this.webSocketService.emitFriendsUpdates(updateDetails);
     },error=>{

       this.displayError(`Changing the item name failed`);
       this.getEditActivity(id);

    });
  }


  /**
 * @description request the server to change the sub item name in the todo list
 * @author Abdul Rahuman
 */

  changeSubItemName(id:string,itemId:string,subItemId:string,subItemName:string,information:string){
    const data={
      id:id,
      itemId:itemId,
      subItemId:subItemId,
      subItemName:subItemName
    };
    const queryParams= `?friendId=${this.friendId}`;
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "subItem" + queryParams,data).
     subscribe(result=>{

     this.getEditActivity(id);
     let updateDetails = {
       friend:this.fId,
       information:information
     };
     this.webSocketService.emitFriendsUpdates(updateDetails);
     },error=>{

       this.displayError(`Changing sub item name failed`);
       this.getEditActivity(id);

    });
  }

  /**
 * @description request the server to delete an item in the todo list
 * @author Abdul Rahuman
 */

  deleteItem(id:string,itemId:string,information:string){
    const data={
      id:id,
      itemId:itemId
    };
    const queryParams= `?friendId=${this.friendId}`;
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "deleteitem" + queryParams,data).
     subscribe(result=>{

     this.getEditActivity(id);
     let updateDetails = {
       friend:this.fId,
       information:information
     };
     this.webSocketService.emitFriendsUpdates(updateDetails);
     },error=>{
       this.displayError(`Deleting item failed`);
       this.getEditActivity(id);
    });
  }

  /**
 * @description request the server to delete a sub item in the todo list
 * @author Abdul Rahuman
 */


  deleteSubItem(id:string,itemId:string,subItemId:string,information:string){
    const data={
      id:id,
      itemId:itemId,
      subItemId:subItemId
    };
    const queryParams= `?friendId=${this.friendId}`;
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "deleteSubItem" + queryParams,data).
     subscribe(result=>{

     this.getEditActivity(id);
     let updateDetails = {
       friend:this.fId,
       information:information
     };
     this.webSocketService.emitFriendsUpdates(updateDetails);
     },error=>{

       this.displayError(`Deleting Sub item failed`);
       this.getEditActivity(id);
    });
  }

  /**
 * @description request the server to delete a todo list
 * @author Abdul Rahuman
 */

    deleteActivity(id:string,information:string) {
      const data={
        id:id
      };
      const queryParams= `?friendId=${this.friendId}`;
      this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "deleteActivity" + queryParams ,data).
       subscribe(result=>{
       this.router.navigate(["/Ftodo",this.fId]);
       // this.getEditActivity(id);
       let updateDetails = {
         friend:this.fId,
         information:information
       };
       this.webSocketService.emitFriendsUpdates(updateDetails);
       },error=>{
         this.displayError(`Deleting your friend's Activity failed`);
         this.router.navigate(["/Ftodo",this.fId]);
      });

    }

    /**
   * @description triggers notification on error
   * @author Abdul Rahuman
   */

    displayError(content:string) {
      this.toastr.error(`${content}`, 'AN ERROR OCCURED', {
      timeOut: 5000,
      });

    }

}
