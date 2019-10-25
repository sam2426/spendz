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
    this.getUserList(this.userId);
    this.getAllUsersList();
  }

  public getUserList:any=(userId)=>{
    console.log("socket setter called");
    this.friendSocketService.getUserList(userId);
  }

  public getAllUsersList:any=()=>{
    console.log("socket getter called");
    this.friendSocketService.userList().subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        // console.log("hi",apiResponse.data);
        this.userList=[];
        this.userList=apiResponse.data;
      }else if(apiResponse.status==300){
        this.toastr.error('No more users to show')
        this.userList=[];
      } else{
        this.toastr.error('some error occured');
      }  
      console.log(this.userList);
    })
  }

  public addFriend(friendId){
    
    this.friendSocketService.addFriendRequest(this.userId, friendId);
    this.getUserList(this.userId);
    this.getAllUsersList();

  }









































  public adder(){

    this.getUserList(this.userId);
    this.getAllUsersList();
  }

  public remover(){
    
    this.userList=[];
    // console.log("hey ihbfksndklfhkj")
  }

   // public userHome(){
  //   this.router.navigate(['/user-home',this.userId]);
  // }

  // public addFriend(friendId){
  //     this.friendSocketService.addFriendRequest(this.userId, friendId).subscribe((apiResponse)=>{
  //     console.log(apiResponse.status);
  //   })
  // }

  // public receiveFriend(){
  //   this.friendSocketService.receiveFriendRequest(this.userId).subscribe((apiResponse)=>{
  //     console.log(apiResponse.status);
  //   })
  // }

  // public consoler=(userId)=>{
  //   console.log("consoler"+userId);
  // }

}
