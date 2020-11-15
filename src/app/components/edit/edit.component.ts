import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditService } from '../../services/edit.service';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { WebsocketsService } from '../../websockets.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit ,OnDestroy{

  isLoading:boolean;
  activity:Todo;
  id:string;
  mainItemId:string;
  cSubItemId:string;
  private liveSub:Subscription;

  constructor(private route: ActivatedRoute,
  private editService:EditService,private webSocketService:WebsocketsService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editService.getEditActivity(this.id);
        }
      );

     let userId=localStorage.getItem("userId");

     this.editService.getActivityAsObervable().subscribe((result:{Activity:Todo})=>{
      this.activity=result.Activity;
      this.isLoading=false;
    });

    this.liveSub=this.webSocketService.listenLivetodoUpdate(userId).subscribe(result=>{
        this.isLoading=true;
        this.editService.getEditActivity(this.id);
    });
  }

  itemId(id:string){
    this.mainItemId=id;

  }

  subItemId(iId:string,sId:string){
    this.cSubItemId=sId;
    this.mainItemId=iId;
  }

  onChangeTitle(form:NgForm){
    this.isLoading=true;
    const title=form.value.cTitle;
    this.editService.changeTitle(this.id,title);
  }

  onChangeDesc(form:NgForm){
   this.isLoading=true;
   const desc=form.value.cDesc;
   this.editService.changeDesc(this.id,desc);

  }

  onChangeSubItem(form:NgForm){
  this.isLoading=true;
  const subItemName=form.value.cSubItem;
  this.editService.changeSubItemName(this.id,this.mainItemId,this.cSubItemId,subItemName)
  }

  onChangeItem(form:NgForm){
  this.isLoading=true;
  const itemName=form.value.cItem;
  this.editService.changeItemName(this.id,this.mainItemId,itemName);
  }

  onDeleteItem(iId:string){
    this.isLoading=true;
     this.mainItemId=iId;
     this.editService.deleteItem(this.id,this.mainItemId);
  }

  onDeleteSubItem(iId:string,sId:string){
    this.isLoading=true;
    this.cSubItemId=sId;
    this.mainItemId=iId;
     this.editService.deleteSubItem(this.id,this.mainItemId,this.cSubItemId);
  }

  onDeleteActivity(){
    this.isLoading=true;
    this.editService.deleteActivity(this.id);
  }

  ngOnDestroy(){
      this.liveSub.unsubscribe();
  }

}
