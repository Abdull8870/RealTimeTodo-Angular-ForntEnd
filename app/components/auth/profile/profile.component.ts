import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   isLoading:boolean = false;
    user:string='';

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.user=localStorage.getItem("name");
    this.isLoading=false;
  }

  onLogOut(){
    this.authService.logout();
  }

}
