import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';
import { Activity } from '../../models/activity.model';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { TodoService } from '../../services/todo.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

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
       if(item.active==false){
         return item;
       }
     });
     this.loading=false;

   });
  }

  /**
  * @description used to reopen a todo list
  * @author Abdul Rahuman
  */

  onOpenActivity(id:string,activityName:string){
    this.loading=true;
    this.todoService.openActivity(id);
  }

}
