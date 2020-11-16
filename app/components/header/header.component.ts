import { Component, OnInit,ViewChild } from '@angular/core';
import { NavbarModule, WavesModule, ButtonsModule,NavbarComponent } from 'angular-bootstrap-md'
import { AuthService } from '../../services/auth.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authSubscriber:Subscription;
  isAuthenticated:boolean;
  @ViewChild('navbar', { static: true }) navbar: NavbarComponent
  constructor(private authService:AuthService) { }

  ngOnInit(): void {

  this.authSubscriber= this.authService.getAuthStatusListener().subscribe((result:{status:boolean})=>{

      this.isAuthenticated=result.status;
    });
  }

}
