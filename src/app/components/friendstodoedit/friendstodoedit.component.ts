import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-friendstodoedit',
  templateUrl: './friendstodoedit.component.html',
  styleUrls: ['./friendstodoedit.component.scss']
})
export class FriendstodoeditComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
              this.router.navigate(["/home"]);
            }, 3000);
  }

}
