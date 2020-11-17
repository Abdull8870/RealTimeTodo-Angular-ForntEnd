import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';
import { Activity } from '../../models/activity.model';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { TodoService } from '../../services/todo.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss']
})
export class DeletedComponent implements OnInit {

  addSubActivityId:string;
  itemID:string;
  loading:boolean;
  allActivity:Todo[]=[];
  temp:Todo[]=[];
  activityId:string;

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.loading=true;
    this.todoService.getActivity();
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

  }

  /**
  * @description used to restore a todo list
  * @author Abdul Rahuman
  */

  OnRestoreActivity(id:string){
    this.loading=true;
    this.todoService.restoreActivity(id);
  }

}
