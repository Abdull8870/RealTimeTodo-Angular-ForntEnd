import { Component, OnInit ,OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';
import { Activity } from '../../models/activity.model';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { FriendsTodoService } from '../../services/friendstodo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketsService } from '../../websockets.service';
import { ToastrService } from 'ngx-toastr';
import { FriendService } from '../../services/friends.service';

@Component({
  selector: 'app-friendstododeleted',
  templateUrl: './friendstododeleted.component.html',
  styleUrls: ['./friendstododeleted.component.scss']
})
export class FriendstododeletedComponent implements OnInit ,OnDestroy{
  id:string;
  addSubActivityId:string;
  itemID:string;
  loading:boolean;
  allActivity:Todo[]=[];
  temp:Todo[]=[];
  activityId:string;
  name:string;
  private liveSub:Subscription;
  private unfriendSub:Subscription;

  constructor(private todoService:FriendsTodoService,
  private route: ActivatedRoute,private router: Router,private webSocketService:WebsocketsService,
  private toastr: ToastrService,private friendsService:FriendService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name");
    this.loading=true;
    this.loading=true;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.todoService.storeUserId(this.id);
          this.todoService.getActivity();
        }
      );
    this.todoService.getAllActivity().subscribe(result=>{
    this.temp=[...result.allActivity];
     this.allActivity=[...result.allActivity];
     this.allActivity=this.temp.filter((item)=>{
       if(item.deleted==true){
         return item;
       }
     });
     this.loading=false;

   });
   let id=localStorage.getItem("fId");
   this.liveSub=this.webSocketService.listenLiveActivity(id).subscribe((result:{information:string,msg:string})=>{
     this.loading=true;
     this.todoService.getActivity();
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


  /**
 * @description Sends the todo list information to the service to restore the todo list
 * @author Abdul Rahuman
 */


  OnRestoreActivity(id:string,activityName:string){
    let information=`${this.name} has restored the activity ${activityName}`;
    this.loading=true;
    this.todoService.restoreActivity(id,information);
  }


  /**
 * @description Navigates to the friends all todo list data
 * @author Abdul Rahuman
 */


  onBackFriendsActivities(){
    this.router.navigate(["/Ftodo",this.id]);
  }

  ngOnDestroy(){
    this.liveSub.unsubscribe();
    this.unfriendSub.unsubscribe();
  }

}
