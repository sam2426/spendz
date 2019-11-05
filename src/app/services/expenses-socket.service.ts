import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
// {
//   providedIn: 'root'
// }

export class ExpensesSocketService {

  // private url = 'http://api.anglrapp.site/group';
  private url = "http://localhost:3000/group";
  private socket;

  constructor(public http:HttpClient, public cookie:CookieService) { 
    this.socket=io(this.url,{ transports: ['websocket'] }); // connection is being created. i.e the handshake is happening here.
    console.log("group socket connected");
  }

  public createGroup=(data)=>{
    this.socket.emit('createExpenseGroup',data);
  }

  // public userList = (userId) => {                   //neds to modify
  //   return Observable.create((observer)=>{
  //     let id='UsersListSuccess'+userId;
  //     this.socket.on(id,(data)=>{
  //       observer.next(data);
  //     }); // end of socket
  //   }) // end of observable
  // } // end getUsersList not friend

  public getGroupList=(userId)=>{
    this.socket.emit('getUserGroup',userId);
  }

  public groupList=(userId)=>{
    return Observable.create((observer)=>{
      let id='groupListSuccess'+userId;
      this.socket.on(id,(data)=>{
        observer.next(data);
      })
    })
  }

  public createExpense=(data)=>{              //this is when a new expense is created
    this.socket.emit('createExpense',data);
  }

  public getExpenseList=()=>{
    this.socket.emit('getExpense','something put here');  // this is when a user clicks a expense group, and list of expense is received. 
  }

  public expenseList=()=>{

  }

}
