import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service'
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown'; //https://www.npmjs.com/package/ng-multiselect-dropdown

@Component({
  selector: 'app-user-spendz',
  templateUrl: './user-spendz.component.html',
  styleUrls: ['./user-spendz.component.css'] //we should not import css files which are also in angular.json file. it errors.
})
export class UserSpendzComponent implements OnInit {

  public userId:string=this.cookies.get('userId');
  public userGroups:string[];
  public groupDetails: string[];
  public contributors: string[];
  public expenses: string[];
  public newGroupName:string;

  public numdun:any[]=[
    {head:"abc", tail:"cba"},
    {head:"cde", tail:"edc"},
    {head:"fgh", tail:"hgf"}
  ];

  public dropdownList:any[] = [];
  public selectedItems:any[]=[];
  public dropdownSettings:IDropdownSettings = {};

  public expenseDate:any;

  constructor(
    public expenseService:ExpenseService,
    public cookies:CookieService,
    public toastr:ToastrService,
  ) { }

  ngOnInit() {
    this.getExpenseGroups('U-jCfdD3Ia'); 
    //load the group names associated with the user at the time of page load.
    // this.groupSelectedToView("G-mDWFnhEU");
    // this.dropdownList=this.contributors;
  }

  public getExpenseGroups:any=(userId)=>{
    this.expenseService.getUserGroups(userId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        this.userGroups=[];
        this.userGroups=apiResponse.data;
        console.log(this.userGroups);
      }else{
        this.toastr.error("Unexpected Error Occured");
      }
    })
  }

  public groupSelectedToView:any=(groupId)=>{
    console.log(groupId + " clicked");
    this.expenseService.getGroupDetails(groupId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        this.groupDetails=[];
        this.contributors=[];
        this.expenses=[];
        this.expenses=apiResponse.data[0].expenses;
        this.contributors=apiResponse.data[0].contributors;
        console.log(this.contributors);
        this.groupDetails=apiResponse.data;
        console.log(this.groupDetails)
      }else{
        this.toastr.error("Unexpected Error Occured");
      }
    })
  }

//   onItemSelect(item: any) {
//     console.log('onItemSelect', item);
// }
// onSelectAll(items: any) {
//     console.log('onSelectAll', items);
// }

public loadUsers(){

  console.log("grp loader",this.contributors);

  this.dropdownList=this.contributors;
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'userId',
    textField: 'firstName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    maxHeight:100,
  };
}

// public onDropDownClose(){
//   console.log(this.selectedItems);
// }
// onDropDownClose() receives the selected items from the dropdown after the drop is closed

public addExpense(){
  console.log(this.expenseDate);
}

}
