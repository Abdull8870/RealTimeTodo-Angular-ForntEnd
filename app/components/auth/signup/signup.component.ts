import { Component, OnInit ,OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

isLoading = false;
 authStatusSub: Subscription;
 countrySub: Subscription;
  phoneSub: Subscription;
  countries:string[]=[];
  phoneCode:{code:string,num:string}[]=[];
 selectedCountry:string;

constructor(private authService:AuthService,private http: HttpClient,
private router: Router) { }

  onSignup(form: NgForm) {
  this.isLoading=true;
  let phoneNum=form.value.phoneCode+''+form.value.phoneNumber;
      let data:User={
      email:form.value.email,
      password:form.value.password,
      firstName:form.value.FirstName,
      lastName:form.value.LastName,
      country:form.value.country,
      phoneNumber:phoneNum
  }


  this.authService.createUser(data);

  }


ngOnInit(): void {
  localStorage.removeItem("email");
  this.isLoading=true;
  this.authService.getCountryCodes();
  this.phoneSub=this.authService.getPhoneAsObservable().subscribe(result=>{
    this.phoneCode=result.phoneCode;
    this.countries=result.countries;
    if(this.phoneCode.length>0 && this.countries.length>0)
    {
      this.isLoading=false;
    }
        });
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    authStatus => {
    this.isLoading = false;
  });
}

   ngOnDestroy():void {
   this.authStatusSub.unsubscribe();
     }

     onAlreadyMember(){
         this.router.navigate(["/login"]);
     }


}
