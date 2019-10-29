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
    //refreshed user id dynamically. snapshot is kind of static
    this._route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
      console.log('user home called'+params.get('userId'));
      this.getProfile(this.userId);
      console.log('call friend list');
      this.getFriendList(this.userId);
    })

    //we need to initiate all the listeners, then only it will be active to listen to sockets,
    //socket.emit can be fired on button clicks or some other events
    this.receiveRequest(this.loggedInId);
    this.deleteRequest(this.loggedInId);
    this.acceptRequest(this.loggedInId);
    this.getFriendList(this.loggedInId);
    this.getAllUsersList(this.loggedInId);
  }

  public receiveRequest=(userId)=>{
    console.log("receiveFriendRequest activated for ",userId)
    this.friendSocketService.receiveFriendRequest(userId).subscribe((data)=>{
      this.toastr.success('Friend Request Received');
      this.getFriendList(this.loggedInId);
      // this.getAllUsersList();
      this.getAllUsersList(this.loggedInId);
    })
  }

  public getProfile: any = (userId) => {                          //to get the details of the the user. here real time not needed.
    this.appService.getSingleUser(userId).subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status === 200) {
        this.userData = apiResponse.data;
      } else {
        this.toastr.warning(apiResponse.message);
      }
    })
  }

  public getFriendList:any=(userId)=>{
    console.log(userId);
    console.log("socket setterssss called");
    this.friendSocketService.getfriendList(userId);
  }

  public getAllUsersList:any=(userId)=>{
    console.log("socket gettersssss called");
    this.friendSocketService.friendList(userId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        console.log("hijjbill",apiResponse.data);
        this.userList = this.parseFriendList(apiResponse.data)
      }else if(apiResponse.status===300){
        this.userList=[];
      }
      else {
        this.toastr.error('some error occured');
      }
      // console.log(this.userList);
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
    // console.log(newArr);
      return newArr;
  }


  public unfriend=(friendId)=>{  
                              //it wil fire the socket when unfriend button is clicked.
    this.friendSocketService.deleteFriendRequest(this.loggedInId,friendId);

  }

  public deleteRequest=(userId)=>{                            //it wil update the list when someone deletes an sent request 
    // console.log("deleteActionRequest activated for ",userId)
    this.friendSocketService.deleteRequestNotify(userId).subscribe((data)=>{
      this.toastr.success('Friend Request Deleted');
      this.getFriendList(this.loggedInId);
      this.getAllUsersList(this.loggedInId);
    })
  }

  public acceptReq=(friendId)=>{                                //it wil fire the delete socket when unfriend/decline button is clicked.

    this.friendSocketService.acceptFriendRequest(this.loggedInId,friendId);
  
  }


  public acceptRequest=(userId)=>{                            //it wil update the list when someone deletes an sent request 
    console.log("acceptActionRequest activated for ",userId)
    this.friendSocketService.acceptRequestNotify(userId).subscribe((data)=>{
      this.toastr.success('Friend Request Deleted');
      this.getFriendList(this.loggedInId);
      this.getAllUsersList(this.loggedInId);
    })
  }

  

}
