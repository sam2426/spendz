import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  @Input() accordionId:string;
  @Input() cardHeader:any;

  public isHidden:boolean=true;

  constructor() { }

  ngOnInit() {
  }

  public ac(){
    console.log("ac is runn");
  }

  public toggleHidden(){
    this.isHidden=!this.isHidden;
  }

}
