import { Component, OnInit, HostListener ,ViewChild,TemplateRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';
import { Activity } from '../../models/activity.model';
import { Todo } from '../../models/todo.model';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { TodoService } from '../../services/todo.service';
import { Router } from "@angular/router";
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  control:boolean;
  z:boolean;
  addSubActivityId:string;
  itemID:string;
  loading:boolean;
  plan:boolean;
  validatingForm: FormGroup;
  allActivity:Todo[]=[];
  temp:Todo[]=[];
  activityId:string;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  modalRef: MDBModalRef;
  constructor(private todoService:TodoService,private router: Router,private modalService: MDBModalService) { }


      /**
      * @description for undo action using control+z
      * @author Abdul Rahuman
      */


  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {

       if(event.key=='Control') {
         this.control=true;
       }
       else if(event.key=='z'){
         this.z=true;
         if(this.control && this.z){

            this.control=false;
             this.z=false;
             this.modalRef = this.modalService.show(this.callAPIDialog, {
             show: true,
   });
         }
       }
       else {
         this.control=false;
          this.z=false;
       }

    }

    @HostListener('window:keydown', ['$event'])
      keyEventDown(event: KeyboardEvent) {

      }


  ngOnInit(): void {
    this.loading=true;
    this.validatingForm = new FormGroup({
     signupFormModalName: new FormControl('', Validators.required),
     signupFormModalEmail: new FormControl('', Validators.email),
     signupFormModalPassword: new FormControl('', Validators.required),
   });

    this.todoService.getActivity();
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


  }

  // stores the todo list and item id

  onAddSubItem(activityId:string,listId:string){
    this.addSubActivityId=activityId;
    this.itemID=listId;
  }

  // stores the todo list ID

  activiyId(id:string){
    this.activityId=id;
  }


   onAddActivity(){
     this.plan=true;
   }

  // gives the todo list which needs to be undo the last modified item

   onUndoActivity(form:NgForm){
   this.onUndo(form.value.undo);
   this.modalRef.hide();

   }



   onCancelUndo(){
        this.modalRef.hide();
   }

   // Sends theDetails of the todo list to the todo service

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

   // on addition of new sub item it gives the name

   onSubItem(form:NgForm){
     let subItem=form.value.activity;

     this.todoService.addSubActivity(subItem,this.addSubActivityId,this.itemID);
     this.loading=true;
     form.reset();
   }

   // on addition of new item it gives the name

   onNewListItem(form:NgForm){
     let newList=form.value.Subactivity;
     this.todoService.addNewList(newList,this.activityId);
     this.loading=true;
     form.reset();
   }

   // sends the information of the item which is marked as done

   onListDone(activityId:string,listId:string){
     this.todoService.markListDone(activityId,listId);
     this.loading=true;
   }


   // sends the information of the sub item which is marked as done


   onDoneSubItem(activityId:string,listId:string,subListId:string){
     this.todoService.markSubListDone(activityId,listId,subListId);
     this.loading=true;
   }


     // sends the information of the sub item which is marked as open

   onOpenSubItem(activityId:string,listId:string,subListId:string){
     this.todoService.markSubListOpen(activityId,listId,subListId);
     this.loading=true;
   }

     // sends the information of tem which is marked as open

   onListOpen(activityId:string,listId:string){
     this.todoService.markListOpen(activityId,listId);
     this.loading=true;
   }

    // sends the information of the todo list for undo action

   onUndo(id:string){
     this.todoService.undo(id);
     this.loading=true;
   }

    // Navigates to the page with the respective edit todo list

   onEdit(id:string){
     this.router.navigate(["/edit",id]);

   }

    // gives the list of todo list which were completed

   onCompleteActivity(id:string){
    this.todoService.markActivityCompleted(id);
    this.loading=true;
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
