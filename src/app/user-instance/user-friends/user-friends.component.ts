import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../../services/app.service';
import { FriendListSocketService } from './../../services/friend-list-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css'],
  providers: [FriendListSocketService]
})
export class UserFriendsComponent implements OnInit {


  public userList:any=[];
  public userId:String='';
  
  constructor(
    public appService:AppService,
    public friendSocketService:FriendListSocketService,
    public toastr:ToastrService,
    public cookies:CookieService,
    public router:Router) { }

  ngOnInit() {
    this.userId=this.cookies.get('userId');
    this.getAllUsersList(this.userId);
  }

  public userHome(){
    this.router.navigate(['/user-home',this.userId]);
  }

  public addFriend(friendId){
    // console.log(userId);
    this.appService.addFriend(this.userId, friendId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        this.consoler(this.userId);
        this.getAllUsersList(this.userId);
        this.toastr.success(apiResponse.message);
        console.log(apiResponse);
      }
      else{
        this.toastr.error('Unable to add Friend');
        console.log(apiResponse);
      }
    })
  }

  public consoler=(userId)=>{
    console.log("consoler"+userId);
  }

  public getAllUsersList:any=(userId)=>{
    console.log("socket called");
    this.friendSocketService.userList(userId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        console.log("hi",apiResponse.data);
        this.userList=[];
        this.userList=apiResponse.data;
      }      
      console.log(this.userList);
    })
  }

}
