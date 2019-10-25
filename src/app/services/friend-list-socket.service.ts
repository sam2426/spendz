import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

// @Injectable()

@Injectable({
  providedIn: 'root'
})
export class FriendListSocketService {

  private url = 'http://localhost:3000/';
  private socket;

  constructor(public http:HttpClient, public cookie:CookieService) { 
    this.socket=io(this.url); // connection is being created. i.e the handshake is happening here.
    console.log("socket connected");
  }

  public getUserList=(userId)=>{
    this.socket.emit('getUsers',userId);
  }

  public userList = () => {
    return Observable.create((observer)=>{
      this.socket.on('UsersListSuccess',(data)=>{
        console.log("from userList socket ",data);
        observer.next(data);
      }); // end of socket
    }) // end of observable
  
  } // end getUsersList not friend

  public addFriendRequest=(userId,friendId)=>{
    let data={
      senderId:userId,
      receiverId:friendId
    }
    this.socket.emit('sendFriendRequest', data);
  }

  public getfriendList=(userId)=>{
    this.socket.emit('getFriends',userId);
  }

  public friendList = () => {
    return Observable.create((observer)=>{
      this.socket.on('FriendListSuccess',(data)=>{
        console.log("from friendList socket ",data);
        observer.next(data);
      }); // end of socket
    }) // end of observable
  
  } // end getUsersList not friend

  //listening to ownID for notifications
  public receiveFriendRequest=(userId)=>{
    return Observable.create((observer)=>{
      this.socket.on(userId,(data)=>{
        console.log("from friendList receiver socket ",data);
        observer.next(data);
      })
    })
  }










































  



  // public friendList= () => {

  //   return Observable.create((observer)=>{
  //     this.socket.on('FriendListSuccess',(data)=>{
  //       observer.next(data);
  //     }); // end of socket
  //   }) // end of observable
  
  } // end getfriendList (friends)


  

  // public addFriendRequest=(userId,friendId)=>{
  //   let data={
  //     senderId:userId,
  //     receiverId:friendId
  //   }

  //   this.socket.emit('sendFriendRequest', data);

    // return Observable.create((observer)=>{
    //   this.socket.on('friendRequestSent',(data)=>{
    //     console.log(data);
    //     observer.next(data);
    //   });
    // });

    // return Observable.create((observer)=>{
    //   this.socket.on('UsersListSuccess',(data)=>{
    //     console.log("from userList socket ",data);
    //     observer.next(data);
    //   }); // end of socket
    // }) // end of observable
  // }

  // public receiveFriendRequest=(userId)=>{
  //   return Observable.create((observer)=>{
  //     this.socket.on('friendRequestReceived',(data)=>{
  //       console.log(data);
  //       observer.next(data);
  //     })
  //   })
  // }


  // public userList(userId):Observable<any>{
  //   return this.http.get(`${this.url}/users/${userId}/allUsers`);
  //  }
 
  //  public friendList(userId):Observable<any>{
  //    return this.http.get(`${this.url}/users/${userId}/allFriends`);
  //   }
// }
