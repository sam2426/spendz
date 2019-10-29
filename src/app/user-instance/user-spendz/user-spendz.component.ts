import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service'
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FriendListSocketService } from './../../services/friend-list-socket.service';
import { ExpensesSocketService } from './../../services/expenses-socket.service';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown'; //https://www.npmjs.com/package/ng-multiselect-dropdown
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-spendz',
  templateUrl: './user-spendz.component.html',
  styleUrls: ['./user-spendz.component.css'] //we should not import css files which are also in angular.json file. it errors.
})
export class UserSpendzComponent implements OnInit {

  public userId:string=this.cookies.get('userId');
  public userGroups:string[];
  public friendsList:any=[];
  public groupDetails: any[];
  public contributors: string[];
  public grpParticipants: string[];
  public expenses: string[];
  public newGroupName:string;
  public newExpenseName: string;
  public expenseDate:any;
  public expenseAmount:number;
  public expenseOwner: string; // the one who paid the expense.

  public friendDropdownList:any[] = [];
  public friendSelectedItems:any[]=[];
  public friendDropdownSettings:IDropdownSettings = {};
  public groupExpenseDropdownList:any[] = [];
  public groupExpenseSelectedItems:any[]=[];
  public groupExpenseDropdownSettings:IDropdownSettings = {};
  
  


  public numdun:any[]=[       //  this is format in which data has to be fed to IDropDownList
    {head:"abc", tail:"cba"},
    {head:"cde", tail:"edc"},
    {head:"fgh", tail:"hgf"}
  ];
  

  constructor(
    public expenseService:ExpenseService,
    public cookies:CookieService,
    public toastr:ToastrService,
    public friendSocketService:FriendListSocketService,
    public expenseSocket:ExpensesSocketService,
  ) { }

  ngOnInit() {
    this.getFriendListEmitter(this.userId);
    this.getFriendsListener(this.userId);

    //load the group names associated with the user at the time of page load.
    this.getGroupListEmitter(this.userId);
    this.getGroupListListener(this.userId);
  }

  public loadFriends(){

    console.log("grp loader",this.contributors);
  
    this.friendDropdownList=this.contributors;
    this.friendDropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      maxHeight:100,
    };
  }
  
  public loadGroupParticipants(){

    this.groupExpenseSelectedItems=[];
    this.newExpenseName='';
    this.expenseAmount=null;
    this.expenseDate='';
    console.log("grp loader",this.grpParticipants);
  
    this.groupExpenseDropdownList=this.grpParticipants;
    this.groupExpenseDropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      maxHeight:100,
    };
  }

  // public resetForm(modalForm:NgForm){
  //   modalForm.reset();
      //.reset is not working bcos the form is fetching data via two way data binding. so either we need to initialise the variables on load or clear it here.
  // }

  public getFriendListEmitter:any=(userId)=>{
    console.log(userId);
    this.friendSocketService.getfriendList(userId);
  }

  public getFriendsListener:any=(userId)=>{
    this.friendSocketService.friendList(userId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        console.log("hijjbill",apiResponse.data);
        // this.friendsList = this.parseFriendList(apiResponse.data);
        this.contributors=this.parseFriendList(apiResponse.data);
      }else if(apiResponse.status===300){
        // this.friendsList=[];
        this.contributors=[] //remove friendList as whole and just put contributors. when idea confirmed.
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
        for(let friend of user.friendList.allFriends){
        //here we are checking freindId==userId because, query response gives an array of friend, and then here we are going inside the friendlist of the friend to find our status. so we need to see only the data of our friends and select our status.
          if (friend.friendSince.length > 0 && friend.friendId == this.userId) {
            let name='';
            ((user.lastName>0)? (name=user.firstName) : (name=user.firstName+" "+user.lastName));
            let newDetails = {
              userId: user.userId,
              userName:name,
              // firstName: user.firstName,
              // lastName: user.lastName,
            }
            newArr.push(newDetails);
          }
        }
      }
    }
    console.log(newArr);
      return newArr;
  }
  ///////////// logic to get the friendList usable to create group ends.


  //create group logic starts
  public addGroup=()=>{
    let finalArray = this.friendSelectedItems.map(obj=>obj.userId); //getting the ids from the selected contributors.
    finalArray.push(this.userId);
    let data={
      groupName:this.newGroupName,
      contributorIds:finalArray,
      ownerId:this.userId,
      userId:this.userId
    }
    console.log(data);
    this.expenseSocket.createGroup(data);
    
  }

  //create group logic ends
  
  //getting groups asscociated with a user.

  public getGroupListEmitter:any=(userId)=>{
    console.log("socket setter called");
    this.expenseSocket.getGroupList(userId);
  }

  public getGroupListListener:any=(userId)=>{
    console.log("socket getter called");
    this.expenseSocket.groupList(userId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        // console.log("hi",apiResponse.data);
        this.userGroups=[];
        this.userGroups=apiResponse.data;
      }else if(apiResponse.status==300){
        // this.toastr.error('No more users to show')
        this.userGroups=[];
      } else{
        this.toastr.error('some error occured');
      }  
      console.log(this.userGroups);
    })
  }


  //idea is to use socket based transactions only for cross-user communication.
  public groupSelectedToView:any=(groupId)=>{
    console.log(groupId + " clicked");
    this.expenseService.getGroupDetails(groupId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        this.groupDetails=[];
        this.grpParticipants=[];
        this.expenses=[];
        this.expenses=apiResponse.data[0].expenses;
        this.grpParticipants=this.parseParticipantList(apiResponse.data[0].contributors);
        console.log(this.grpParticipants);
        this.groupDetails=apiResponse.data;
        console.log(this.groupDetails)
      }else{
        this.toastr.error("Unexpected Error Occured");
      }
    })
  }

  public parseParticipantList: any = (participantData) => {
    let newArr = [];
    for (let user of participantData) {
      let name = '';
      ((user.lastName > 0) ? (name = user.firstName) : (name = user.firstName + " " + user.lastName));
      let details = {
        userId: user.userId,
        userName: name,
      }
      newArr.push(details);
    }
    console.log(newArr);
    return newArr;
  }

  //function to create expense with received details
  public addExpense(){
    let finalArray = this.groupExpenseSelectedItems.map(obj=>obj.userId); //getting the ids from the selected contributors.
    let dateData=new Date(this.expenseDate.year, this.expenseDate.month - 1, this.expenseDate.day).toISOString();
    let data={
      groupId:this.groupDetails[0].groupId,
      members:finalArray,
      amount:this.expenseAmount,
      expenseName:this.newExpenseName,
      ownerId:this.expenseOwner,
      userId:this.userId,
      expensedOn:dateData
    }
    console.log("printing expense data")
    console.log(data);
    this.expenseSocket.createExpense(data);
  }

  // public getExpenseGroups:any=(userId)=>{
  //   this.expenseService.getUserGroups(userId).subscribe((apiResponse)=>{
  //     if(apiResponse.status===200){
  //       this.userGroups=[];
  //       this.userGroups=apiResponse.data;
  //       console.log(this.userGroups);
  //     }else{
  //       this.toastr.error("Unexpected Error Occured");
  //     }
  //   })
  // }

  //getting user group ends


  // public groupSelectedToView:any=(groupId)=>{
  //   console.log(groupId + " clicked");
  //   this.expenseService.getGroupDetails(groupId).subscribe((apiResponse)=>{
  //     if(apiResponse.status===200){
  //       this.groupDetails=[];
  //       this.contributors=[];
  //       this.expenses=[];
  //       this.expenses=apiResponse.data[0].expenses;
  //       this.contributors=apiResponse.data[0].contributors;
  //       console.log(this.contributors);
  //       this.groupDetails=apiResponse.data;
  //       console.log(this.groupDetails)
  //     }else{
  //       this.toastr.error("Unexpected Error Occured");
  //     }
  //   })
  // }

//   onItemSelect(item: any) {
//     console.log('onItemSelect', item);
// }
// onSelectAll(items: any) {
//     console.log('onSelectAll', items);
// }



// public onDropDownClose(){
//   console.log(this.selectedItems);
// }
// onDropDownClose() receives the selected items from the dropdown after the drop is closed



}
