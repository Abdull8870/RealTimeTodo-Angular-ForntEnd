import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FriendsEditService } from '../../services/friendsedit.service';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { NgForm } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { WebsocketsService } from '../../websockets.service';
import { ToastrService } from 'ngx-toastr';
import { FriendService } from '../../services/friends.service';

@Component({
  selector: 'app-friendstodo-edit',
  templateUrl: './friendstodo-edit.component.html',
  styleUrls: ['./friendstodo-edit.component.scss']
})
export class FriendstodoEditComponent implements OnInit,OnDestroy {

  isLoading:boolean;
  activity:Todo;
  id:string;
  mainItemId:string;
  cSubItemId:string;
  activityName:string;
  listName:string;
  subListName:string;
  name:string;
  desc:string;
  private liveSub:Subscription;
  private unfriendSub:Subscription;

  constructor(private route: ActivatedRoute,
  private editService:FriendsEditService,private router: Router,
  private authService:AuthService,
  private webSocketService:WebsocketsService,
  private toastr: ToastrService,private friendsService:FriendService) { }


  ngOnInit(): void {
    this.name=localStorage.getItem("name");
    this.isLoading=true;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editService.getEditActivity(this.id);
        }
      );

     this.editService.getActivityAsObervable().subscribe((result:{Activity:Todo})=>{
      this.activity=result.Activity;
      this.isLoading=false;
      this.activityName=this.activity.activityName;
      this.desc=this.activity.description;
    });

    let id=localStorage.getItem("fId");
    this.editService.storeUserId(id);

    this.liveSub=this.webSocketService.listenLiveActivity(id).subscribe((result:{information:string,msg:string})=>{
      this.isLoading=true;
      this.editService.getEditActivity(this.id);
      this.toastr.success(result.information,'An update Has been Made', {
      timeOut: 3000,
      });
    });

    this.unfriendSub=this.friendsService.getUnfiendAsObservable().subscribe(result=>{
       this.router.navigate(['/friends']);
       this.toastr.info(`You are no more friend with the user`, 'Authorization Removed', {
       timeOut: 5000,
       });
    });
  }

  // Stores the todo list and item id

  itemId(id:string,itemName:string){
    this.listName=itemName;
    this.mainItemId=id;

  }

  // stores the todo list item and sub item id's

  subItemId(iId:string,sId:string,itemName:string,subItemName:string){
    this.cSubItemId=sId;
    this.mainItemId=iId;
    this.listName=itemName;
    this.subListName=subItemName;
  }

  /**
 * @description Sends the new title of the todo list to the server
 * @author Abdul Rahuman
 */


  onChangeTitle(form:NgForm){

    this.isLoading=true;
    const title=form.value.cTitle;
    let information=`${this.name} has changed the title of todoactvity ${this.activityName} as ${title}`;
    this.editService.changeTitle(this.id,title,information);
    form.reset();
  }

  /**
 * @description Sends the new description of the todo list to the server
 * @author Abdul Rahuman
 */


  onChangeDesc(form:NgForm){
   this.isLoading=true;
   const desc=form.value.cDesc;
   let information=`${this.name} has changed the description of todoactvity ${this.activityName} as ${this.desc}`;
   this.editService.changeDesc(this.id,desc,information);
   form.reset();
  }

  /**
 * @description Sends the new sub item name of the todo list to the server
 * @author Abdul Rahuman
 */


  onChangeSubItem(form:NgForm){
  this.isLoading=true;
  const subItemName=form.value.cSubItem;
  let information=`${this.name} has changed the subitem of in the list ${this.listName} of todoactvity ${this.activityName} as ${subItemName}`;
  this.editService.changeSubItemName(this.id,this.mainItemId,this.cSubItemId,subItemName,information)
  form.reset();
  }

  /**
 * @description Sends the new item name of the todo list to the server
 * @author Abdul Rahuman
 */


  onChangeItem(form:NgForm){
  this.isLoading=true;
  const itemName=form.value.cItem;
  let information=`${this.name} has changed the name of list ${this.listName} in todoactvity ${this.activityName} as ${itemName}`;
  this.editService.changeItemName(this.id,this.mainItemId,itemName,information);
   form.reset();
  }

  /**
 * @description Sends the information about the item to be deleted to the server
 * @author Abdul Rahuman
 */


  onDeleteItem(iId:string,itemName:string){
    this.listName=itemName;
    this.isLoading=true;
    this.mainItemId=iId;
    let information=`${this.name} has deleted the list ${this.listName} in todoactvity ${this.activityName}`;
    this.editService.deleteItem(this.id,this.mainItemId,information);
  }

  /**
 * @description Sends the information about the sub item to be deleted to the server
 * @author Abdul Rahuman
 */



  onDeleteSubItem(iId:string,sId:string,itemName:string,subItemName:string){
    this.listName=itemName;
    this.subListName=subItemName;
    this.isLoading=true;
    this.cSubItemId=sId;
    this.mainItemId=iId;
        let information=`${this.name} has deleted the subitemlist in the list ${this.listName} and todoactvity ${this.activityName} as
        ${this.subListName}`;
     this.editService.deleteSubItem(this.id,this.mainItemId,this.cSubItemId,information);
  }


  /**
 * @description Sends the information about the todo list to be deleted to the server
 * @author Abdul Rahuman
 */


  onDeleteActivity(){
    this.isLoading=true;
    let information=`${this.name} has deleted todoactvity ${this.activityName}`;
    this.editService.deleteActivity(this.id,information);
  }

  /**
 * @description Navigates to friends all todo list page
 * @author Abdul Rahuman
 */


  onBackFriendsActivities(){
    let id=localStorage.getItem("friendId");
    this.router.navigate(["/Ftodo",id]);
  }

  ngOnDestroy(){
    this.liveSub.unsubscribe();
    this.unfriendSub.unsubscribe();
  }

}
