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

  constructor(private todoService:FriendsTodoService,
  private route: ActivatedRoute,private router: Router,private webSocketService:WebsocketsService,
  private toastr: ToastrService) { }

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
   this.liveSub=this.webSocketService.listenLiveActivity(id).subscribe(result=>{
     this.loading=true;
     this.todoService.getActivity();
     this.toastr.success("",'An update Has been Made', {
     timeOut: 3000,
     });
   });

  }

  OnRestoreActivity(id:string,activityName:string){
    let information=`${this.name} has restored the activity ${activityName}`;
    this.loading=true;
    this.todoService.restoreActivity(id,information);
  }

  onBackFriendsActivities(){
    this.router.navigate(["/Ftodo",this.id]);
  }

  ngOnDestroy(){
    this.liveSub.unsubscribe();
  }
}
