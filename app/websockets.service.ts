import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socket:any;
  BACKEND_URL:string="http://expensesplitterbackend-env.eba-vpaafhyz.us-east-2.elasticbeanstalk.com";

  constructor(private http: HttpClient) {
    this.socket=io(this.BACKEND_URL);

  }

  listenLiveProjects(id:string){

   return new Observable((subscriber)=>{
    this.socket.on(id,(data)=>{
      subscriber.next(data);
    })

  });
}


    emitFriendsUpdates(updateDetails:{friend:string,information:string}){

     this.socket.emit("friendsupdates",updateDetails);
    }


    listenLivetodoUpdate(id:string){

      return new Observable((subscriber)=>{
       this.socket.on(id,(data)=>{
         subscriber.next(data);
       });

     });
    }

    listenLiveActivity(id:string){

      return new Observable((subscriber)=>{
       this.socket.on(id,(data)=>{
         subscriber.next(data);
       });

     });
    }

    emitLiveActivity(updateDetails:{userId:string,information:string}){
      this.socket.emit("activityUpdate",updateDetails);
    }

    listenLiveFriends(id:string){

      return new Observable((subscriber)=>{
       this.socket.on(id,(data)=>{
         subscriber.next(data);
       });

     });
    }

    emitLiveFriendsUpdate(updateDetails:{userId:string,type:string,info:string}){
      console.log("inside emit");
      this.socket.emit("friendUpdate",updateDetails);
    }
}
