import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-spendz',
  templateUrl: './user-spendz.component.html',
  styleUrls: ['./user-spendz.component.css']
})
export class UserSpendzComponent implements OnInit {

  public userId:string=this.cookies.get('userId');
  public userGroups:[];

  constructor(
    public expenseService:ExpenseService,
    public cookies:CookieService
  ) { }

  ngOnInit() {
    this.getExpenseGroups('U-jCfdD3Ia');
  }

  public getExpenseGroups:any=(userId)=>{
    this.expenseService.getUserGroups(userId).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        this.userGroups=[];
        this.userGroups=apiResponse.data;
      }
    })
  }

}
