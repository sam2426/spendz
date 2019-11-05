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

  // private url = 'http://api.anglrapp.site/';
  private url = "http://localhost:3000/";
  private socket;

  constructor(public http:HttpClient, public cookie:CookieService) { 
    // let data={user:cookie.get('userId')}
    this.socket=io(this.url); // connection is being created. i.e the handshake is happening here.
    // this.socket.emit('join', data);
    console.log("socket connected",data);
  }

  public listReload=(userId)=>{
    return Observable.create((observer)=>{
      this.socket.on(userId,(data)=>{
        observer.next(data);
      })
    })
  }//this shall listen to calls from backend on userId if any friend statuses change,then it shall inform the component.

  public notifyFriend=(data)=>{
    this.socket.emit('notifyFriend',data);
  }

}

//   public getUserList=(userId)=>{
//     this.socket.emit('getUsers',userId);
//   }

//   public userList = (userId) => {
//     return Observable.create((observer)=>{
//       let id='UsersListSuccess'+userId;
//       this.socket.on(id,(data)=>{
//         observer.next(data);
//       }); // end of socket
//     }) // end of observable
//   } // end getUsersList not friend

//   public getfriendList=(userId)=>{
//     this.socket.emit('getFriends',userId);
//   }

//   public friendList = (userId) => {
//     let id='FriendListSuccess'+userId;
//     return Observable.create((observer)=>{
//       this.socket.on(id,(data)=>{
//         observer.next(data);
//       }); // end of socket
//     }) // end of observable
//   } // end getUsersList not friend


//   public addFriendRequest=(userId,friendId)=>{
//     let data={
//       senderId:userId,
//       receiverId:friendId
//     }
//     this.socket.emit('sendFriendRequest', data);
//   }

//   public receiveFriendRequest=(userId)=>{                   //listening to ownID for notifications
//     let id='ReceiveRequest'+userId;
//     return Observable.create((observer)=>{
//       this.socket.on(id,(data)=>{
//         observer.next(data);
//       })
//     })
//   }


  
//   public deleteFriendRequest=(userId,friendId)=>{         //fired when delete button is clicked, in the userHome page
//     let data={
//       senderId:userId,
//       receiverId:friendId
//     }
//     this.socket.emit('deleteFriendRequest', data);
//   }

//   public deleteRequestNotify=(userId)=>{                  //called when delete request is processed. 
//     let id='DeleteRequest'+userId;                        //it has to update both userHomePage and userFriendsPage.
//     return Observable.create((observer)=>{
//       this.socket.on(id,(data)=>{
//         observer.next(data);
//       })
//     })
//   }

  
//   public acceptFriendRequest=(userId,friendId)=>{         //fired when accept button is clicked, in the userHome page
//     let data={
//       senderId:userId,
//       receiverId:friendId
//     }
//     this.socket.emit('acceptFriendRequest', data);
//   }

//   public acceptRequestNotify=(userId)=>{                  //called when accept request is processed. it has to update userHomePage only
//     let id='AcceptRequest'+userId;
//     return Observable.create((observer)=>{
//       this.socket.on(id,(data)=>{
//         observer.next(data);
//       })
//     })
//   }

// }


