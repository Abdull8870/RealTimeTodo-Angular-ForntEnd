import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

   isLoading = false;
   isForgetPassword:boolean=true;
    constructor(private authService:AuthService,private router: Router) { }

    back(){
       this.router.navigate(["/login"]);
    }


    ngOnInit(): void {
      localStorage.removeItem("email");
    }

    onForgetPassword(form: NgForm)
    {
      this.authService.forgetPassword(form.value.email);
      this.isForgetPassword=false;
    }

    onRest(form: NgForm){
      this.isLoading=true;
      this.authService.resetPassword(form.value.password,form.value.code);
      this.isLoading=false;
      }

}
