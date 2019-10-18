import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FriendListSocketService {

  private url = 'http://localhost:3000/';
  private socket;

  constructor(public http:HttpClient, public cookie:CookieService) { 
    this.socket=io(this.url); // connection is being created. i.e the handshake is happening here.
  }

  public friendList= (userId) => {

    this.socket.emit('getFriends', userId);

    return Observable.create((observer)=>{
      this.socket.on('FriendListSuccess',(data)=>{
        observer.next(data);
      }); // end of socket
    }) // end of observable
  
  } // end getChatMessage


  public userList = (userId) => {

    this.socket.emit('getUsers', userId);

    return Observable.create((observer)=>{
      this.socket.on('UsersListSuccess',(data)=>{
        console.log("from userList socket "+data.data[0]);
        observer.next(data);
      }); // end of socket
    }) // end of observable
  
  } // end getChatMessage


  // public userList(userId):Observable<any>{
  //   return this.http.get(`${this.url}/users/${userId}/allUsers`);
  //  }
 
  //  public friendList(userId):Observable<any>{
  //    return this.http.get(`${this.url}/users/${userId}/allFriends`);
  //   }
}
