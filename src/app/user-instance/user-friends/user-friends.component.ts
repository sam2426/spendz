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
  // providers: [FriendListSocketService]
})
export class UserFriendsComponent implements OnInit {


  public userList:any=[];
  public userId:String=''; //userId of the logged in user.
  
  constructor(
    public appService:AppService,
    public friendSocketService:FriendListSocketService,
    public toastr:ToastrService,
    public cookies:CookieService,
    public router:Router) { }

  ngOnInit() {
    this.userId=this.cookies.get('userId');
    this.getOtherUsers(this.userId); //loading the other users in the add friends page.
    this.listLoader(this.userId); //informs the view if any request comes from friend.

    // this.getUserList(this.userId);
    // this.getAllUsersList(this.userId);
    // this.receiveRequest(this.userId);
    // this.deleteRequest(this.userId);
  }

  public getOtherUsers:any=(userId)=>{
    this.appService.userList(userId).subscribe((apiResponse)=>{
      console.log(apiResponse);
      this.userList=[];
      if(apiResponse.status===200){
        this.userList=apiResponse.data;
      }else {
        this.toastr.warning(apiResponse.message);
      }
    })
  } //this func is to get the users who are not friends from the backend. call this whenever the list is needed.

  public addFriend(friendId){
    
    this.appService.addFriend(this.userId, friendId).subscribe((apiResponse)=>{
      console.log(apiResponse);
      if(apiResponse.status===200){
        this.getOtherUsers(this.userId);
        let data={
          action:'add',
          message:'Add Request sent',
          sender:this.userId,
          receipient:friendId
        }
        this.friendSocketService.notifyFriend(data);
      }else {
        this.toastr.warning(apiResponse.message);
      }
    });
    
  }

  public listLoader:any=(userId)=>{
    this.friendSocketService.listReload(userId).subscribe((apiResponse)=>{
      if(apiResponse.action==='add'){
        console.log("list Loader called.");
        this.getOtherUsers(userId);
      }else if(apiResponse.action==='delete'){
        console.log("Request Deleted");
        this.getOtherUsers(userId);
      }
      
    })
  }
}
  // public getUserList:any=(userId)=>{
  //   console.log("socket setter called");
  //   this.friendSocketService.getUserList(userId);
  // }

  // public getAllUsersList:any=(userId)=>{
  //   console.log("socket getter called");
  //   this.friendSocketService.userList(userId).subscribe((apiResponse)=>{
  //     if(apiResponse.status===200){
  //       // console.log("hi",apiResponse.data);
  //       this.userList=[];
  //       this.userList=apiResponse.data;
  //     }else if(apiResponse.status==300){
  //       this.toastr.error('No more users to show')
  //       this.userList=[];
  //     } else{
  //       this.toastr.error('some error occured');
  //     }  
  //     console.log(this.userList);
  //   })
  // }

  // public addFriend(friendId){
    
  //   this.friendSocketService.addFriendRequest(this.userId, friendId);
  //   this.getUserList(this.userId);
  //   this.getAllUsersList();

  // }

  // public receiveRequest=(userId)=>{                             //it will update the list when someone sends request in real time
  //   // console.log("receiveFriendRequest activated for ",userId)
  //   this.friendSocketService.receiveFriendRequest(userId).subscribe((data)=>{
  //     this.toastr.success('Friend Request Received');
  //     this.getUserList(this.userId);
  //     this.getAllUsersList(this.userId);
  //   })
  // }

  // public deleteRequest=(userId)=>{                            //it wil update the list when someone deletes an sent request 
  //   console.log("deleteActionRequest activated for ",userId)
  //   this.friendSocketService.deleteRequestNotify(userId).subscribe((data)=>{
  //     // this.toastr.success('Friend Request Received');
  //     this.getUserList(this.userId);
  //     this.getAllUsersList(this.userId);
  //   })
  // }



  //  public userHome(){
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


