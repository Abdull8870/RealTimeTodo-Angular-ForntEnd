import { Component, OnInit ,OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';
import { Activity } from '../../models/activity.model';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { FriendsTodoService } from '../../services/friendstodo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebsocketsService } from '../../websockets.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FriendService } from '../../services/friends.service';

@Component({
  selector: 'app-friendstodolist',
  templateUrl: './friendstodolist.component.html',
  styleUrls: ['./friendstodolist.component.scss']
})

export class FriendstodolistComponent implements OnInit,OnDestroy {

  id:string;
  addSubActivityId:string;
  itemID:string;
  loading:boolean;
  plan:boolean;
  validatingForm: FormGroup;
  allActivity:Todo[]=[];
  temp:Todo[]=[];
  activityId:string;
  private liveSub:Subscription;
  name:string;

  constructor(private todoService:FriendsTodoService,private router: Router,
    private route: ActivatedRoute,
    private webSocketService:WebsocketsService,
    private toastr: ToastrService,private friendsService:FriendService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name");

    this.loading=true;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          localStorage.setItem("fId", this.id);
          this.todoService.storeUserId(this.id);
          this.todoService.getActivity();
          this.liveSub=this.webSocketService.listenLiveActivity(this.id).subscribe((result:{information:string,msg:string})=>{
            this.loading=true;
            this.todoService.getActivity();
            console.log(result);
            this.toastr.success(result.information,'An update Has been Made', {
            timeOut: 3000,
            });
          });
        }
      );
     this.validatingForm = new FormGroup({
     signupFormModalName: new FormControl('', Validators.required),
     signupFormModalEmail: new FormControl('', Validators.email),
     signupFormModalPassword: new FormControl('', Validators.required),
   });

    this.todoService.getAllActivity().subscribe(result=>{
      this.temp=[...result.allActivity];
     this.allActivity=[...result.allActivity];
     this.allActivity=this.temp.filter((item)=>{
       if(item.deleted==false && item.active==true){
         return item;
       }
     });
     this.loading=false;

   });

   this.friendsService.getUnfiendAsObservable().subscribe(result=>{
      this.router.navigate(['/friends']);
      this.toastr.info(`You are no more friend with the user`, 'Authorization Removed', {
      timeOut: 5000,
      });
   });


  }


  activiyId(id:string){
    this.activityId=id;
  }


   onSubmit(form:NgForm){
     let name=form.value.activity;
     let des=form.value.description;
     let activity:Activity ={
       activityName:name,
       description:des,
     };
     this.todoService.addActivity(activity);
      this.loading=true;
      form.reset();
   }

   onSubItem(form:NgForm){
     let subItem=form.value.activity;

     this.todoService.addSubActivity(subItem,this.addSubActivityId,this.itemID);
     this.loading=true;
     form.reset();
   }

   onNewListItem(form:NgForm){
     let newList=form.value.Subactivity;
     this.todoService.addNewList(newList,this.activityId);
     this.loading=true;
   }

   onListDone(activityId:string,listId:string,activityName:string,listName:string){
          let information=`${this.name} has chenge the list  ${listName} in the todoactvity ${activityName} as open`;
     this.todoService.markListDone(activityId,listId,information);
     this.loading=true;
   }

   onDoneSubItem(activityId:string,listId:string,subListId:string,
     activityName:string,listName:string,subItemName:string){
            let information=`${this.name} has marked the subitem ${subItemName}
             in the list  ${listName} on the todoactvity ${activityName} as Done`;
     this.todoService.markSubListDone(activityId,listId,subListId,information);
     this.loading=true;
   }

   onOpenSubItem(activityId:string,listId:string,subListId:string,
     activityName:string,listName:string,subItemName:string){
      let information=`${this.name} has marked the subitem ${subItemName}
      in the list  ${listName} on the todoactvity ${activityName} as open`;
     this.todoService.markSubListOpen(activityId,listId,subListId,information);
     this.loading=true;
   }


   onListOpen(activityId:string,listId:string,activityName:string,listName:string){
     let information=`${this.name} has marked the list  ${listName} in the todoactvity ${activityName} as completed`;
     this.todoService.markListOpen(activityId,listId,information);
     this.loading=true;
   }

   onUndo(id:string,activityName:string){
     let information=`${this.name} has done undo for the todoactvity: ${activityName}`
     this.todoService.undo(id,information);
     this.loading=true;
   }

   onEdit(id:string){
     this.router.navigate(["/Fedit",id]);

   }

   onCompleteActivity(id:string,activityName:string){
    let information=`${this.name} has marked the activity ${activityName} as completed`
    this.todoService.markActivityCompleted(id,information);
    this.loading=true;
   }

   onFriendsDeletedList(){
   this.router.navigate(["/Fdeleted",this.id]);

}

  onFriendsCompletedList(){

     this.router.navigate(["/Fcompleted",this.id]);

  }

  ngOnDestroy(){
    this.liveSub.unsubscribe();
  }

   get signupFormModalName() {
   return this.validatingForm.get('signupFormModalName');
  }

   get signupFormModalEmail() {
   return this.validatingForm.get('signupFormModalEmail');
  }

   get signupFormModalPassword() {
   return this.validatingForm.get('signupFormModalPassword');
  }
  }
