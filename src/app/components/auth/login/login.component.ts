import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../../services/auth.service';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  isLoading = false;
  isForgetPassword:boolean=false;
  private authStatusSub: Subscription;

 constructor(private authService:AuthService,private router: Router) { }

 /**
 * @description navigates to password reset page
 * @author Abdul Rahuman
 */

 onForgetPassword(){
  this.router.navigate(["/reset"]);
}

/**
* @description sends the credentials for login
* @author Abdul Rahuman
*/


  onLogin(form: NgForm) {
    this.authService.login(form.value.email,form.value.password);
  }

  /**
  * @description sends the email id of the user for password reset
  * @author Abdul Rahuman
  */

  onRest(form: NgForm){
     this.authService.forgetPassword(form.value.email);
  }


 ngOnInit(): void {
   localStorage.removeItem("email");
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
   authStatus => {
     this.isLoading = false;
   }
 );
 }

   ngOnDestroy():void{
   this.authStatusSub.unsubscribe();
 }


 /**
 * @description navigates to signup page
 * @author Abdul Rahuman
 */


  onSignUp(){
    this.router.navigate(["/signup"]);
  }

}
