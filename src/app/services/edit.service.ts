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


const BACKEND_URL = environment.apiUrl + "/edit/";

@Injectable({ providedIn: "root" })
export class EditService {

  private id:string;
  private activity = new Subject<{Activity:Todo}>();
  private userName:string;

  constructor(private http: HttpClient, private router: Router,
  private toastr: ToastrService,private webSocketService:WebsocketsService) {

  }


  /**
 * @description Sends the todo list for edit as an observable when called
 * @author Abdul Rahuman
 */


  getActivityAsObervable(){
    return this.activity.asObservable();
  }


  /**
 * @description request the server to get the todo list details to edit
 * @author Abdul Rahuman
 */


  getEditActivity(id:string) {

    const queryParams = `?id=${id}`;

    this.http.get<{message:"SUCCESS",data:Todo}>(BACKEND_URL + "get" + queryParams).
     subscribe(result=>{

     this.activity.next({Activity:result.data});
     },error=>{
       this.displayError("Fetching activity failed");
       this.router.navigate(['/todo']);
    });
  }

  /**
 * @description request the server to change the title of the todo list
 * @author Abdul Rahuman
 */



  changeTitle(id:string,title:string) {
    this.userName=localStorage.getItem("name");
    const data={
      id:id,
      title:title
    };

    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "title",data).
     subscribe(result=>{
     this.getEditActivity(id);
     let userId=localStorage.getItem("userId");
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The title has been changed Successfully`);
     },error=>{

       this.getEditActivity(id);
       this.displayError("Changing the title of the todo list Failed");

    });

  }

  /**
 * @description request the server to change the description of the todo list
 * @author Abdul Rahuman
 */

  changeDesc(id:string,desc:string){
    this.userName=localStorage.getItem("name");
    const data={
      id:id,
      desc:desc
    };
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "desc",data).
     subscribe(result=>{

     this.getEditActivity(id);
     let userId=localStorage.getItem("userId");
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The Description has been changed Successfully`);
     },error=>{

       this.getEditActivity(id);
       this.displayError("Changing the description of the todo list Failed");

    });
  }

  /**
 * @description request the server to change the item name in the todo list
 * @author Abdul Rahuman
 */



  changeItemName(id:string,itemId:string,itemName:string){
    this.userName=localStorage.getItem("name");
    const data={
      id:id,
      itemId:itemId,
      itemName:itemName
    };
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "item",data).
     subscribe(result=>{

     this.getEditActivity(id);
     let userId=localStorage.getItem("userId");
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The item name has been changed Successfully`);
     },error=>{

       this.getEditActivity(id);
       this.displayError("Changing the item name Failed");

    });
  }

  /**
 * @description request the server to change the sub item name in the todo list
 * @author Abdul Rahuman
 */


  changeSubItemName(id:string,itemId:string,subItemId:string,subItemName:string){
    this.userName=localStorage.getItem("name");
    const data={
      id:id,
      itemId:itemId,
      subItemId:subItemId,
      subItemName:subItemName
    };
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "subItem",data).
     subscribe(result=>{

     this.getEditActivity(id);
     let userId=localStorage.getItem("userId");
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
     this.displaySuccess(`The sub item name has been changed Successfully`);
     },error=>{

       this.getEditActivity(id);
       this.displayError("Changing the Sub item name Failed");

    });
  }

  /**
 * @description request the server to delete an item in the todo list
 * @author Abdul Rahuman
 */


  deleteItem(id:string,itemId:string){
    this.userName=localStorage.getItem("name");
    const data={
      id:id,
      itemId:itemId
    };
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "deleteitem",data).
     subscribe(result=>{

     this.getEditActivity(id);
     let userId=localStorage.getItem("userId");
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The item has been deleted Successfully`);
     },error=>{

       this.getEditActivity(id);
       this.displayError("Deleting the item Failed");

    });
  }

  /**
 * @description request the server to delete a sub item in the todo list
 * @author Abdul Rahuman
 */


  deleteSubItem(id:string,itemId:string,subItemId:string){
    this.userName=localStorage.getItem("name");
    const data={
      id:id,
      itemId:itemId,
      subItemId:subItemId
    };
    this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "deleteSubItem",data).
     subscribe(result=>{

     this.getEditActivity(id);
     let userId=localStorage.getItem("userId");
     let updateDetails = {
       userId:userId,
       information:`${this.userName} Has made an Update on his todo list`
     };
     this.webSocketService.emitLiveActivity(updateDetails);
      this.displaySuccess(`The sub item has been deleted Successfully`);
     },error=>{

       this.getEditActivity(id);
       this.displayError("Deleting sub item Failed");

    });
  }

  /**
 * @description request the server to delete a todo list
 * @author Abdul Rahuman
 */

    deleteActivity(id:string) {
      this.userName=localStorage.getItem("name");
      const data={
        id:id
      };
      this.http.post<{message:"SUCCESS"}>(BACKEND_URL + "deleteActivity",data).
       subscribe(result=>{
       this.router.navigate(["/todo"]);
       this.getEditActivity(id);
       let userId=localStorage.getItem("userId");
       let updateDetails = {
         userId:userId,
         information:`${this.userName} Has made an Update on his todo list`
       };
       this.webSocketService.emitLiveActivity(updateDetails);
       this.displaySuccess(`The todo list has been deleted Successfully`);
       },error=>{
        this.getEditActivity(id);
        this.displayError("Delete Activity Failed");

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

    /**
   * @description triggers notification on success
   * @author Abdul Rahuman
   */


    displaySuccess(content:string) {
      this.toastr.success(`${content}`, 'SUCCESS', {
      timeOut: 5000,
      });

    }

}
