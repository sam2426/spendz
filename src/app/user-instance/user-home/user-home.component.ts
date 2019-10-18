import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../../services/app.service';
import { FriendListSocketService } from './../../services/friend-list-socket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  public currentUser;
  public userData={};
  public loggedInId = '';
  public userId = '';
  public userList: any = [];
  public userInfo: any;

  constructor(
    public appService: AppService,
    public friendSocketService:FriendListSocketService,
    public toastr: ToastrService,
    public cookies: CookieService,
    public _route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    // this.authToken=this.cookies.get('authToken');
    this.loggedInId = this.cookies.get('userId');
    this.userInfo = this.appService.getUserInfoFromLocalStorage();
    //getting the user id from the route, here snapshot method didn't work so used observable to get the 
    //refreshed user id dynamically. snapshot is kinf of static
    this._route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
      console.log('user home called'+params.get('userId'));
      this.getProfile(this.userId);
      console.log('call friend list');
      this.getFriendList(this.userId);
    })
  }

  public getProfile: any = (userId) => {
    this.appService.getSingleUser(userId).subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status === 200) {
        this.userData = apiResponse.data;
      } else {
        this.toastr.warning(apiResponse.message);
      }
    })
  }

  public getFriendList: any = (userId) => {
    this.friendSocketService.friendList(userId).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        console.log(apiResponse.data);
        this.userList = this.parseFriendList(apiResponse.data)
      }
      else {
        this.toastr.warning('No friends to list');
      }
      console.log(this.userList);
    })
  }

  public parseFriendList: any = (userFriendData) => {
    let newArr = [];
    for (let user of userFriendData) {
      if (user.hasOwnProperty('friendList')) {
        let sent = false;
        let received = false;
        let isFriend = false;
        for(let friend of user.friendList.allFriends){
        // user.friendList.allFriends.forEach(element => {
          if (friend.friendId == this.userId) {
            sent = friend.requestSent;
            received = friend.requestReceived;
            (friend.friendSince === '') ? (isFriend = false) : (isFriend = true);
            let newDetails = {
              userId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              profilePic: user.profilePic,
              isFriend: isFriend,
              requestSent: sent,
              requestReceived: received
            }
            newArr.push(newDetails);
          }
        }
      }
    }
    console.log(newArr);
      return newArr;
  }

  public acceptReq=(friendId)=>{
    this.appService.acceptReq(this.userId,friendId).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.getFriendList(this.userId);
        this.toastr.success('Request Accepted');
      }
      else {
        this.toastr.warning('Error');
      }
    })
  }

  public unfriend=(friendId)=>{
    this.appService.deleteReq(this.userId,friendId).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.getFriendList(this.userId);
        this.toastr.success('Request Processed');
      }
      else {
        this.toastr.warning('Error');
      }
    })
  }

}
