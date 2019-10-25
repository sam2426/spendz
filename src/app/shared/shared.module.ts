import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';

const routes: Routes = [
  // {path:'**', component:NotFoundComponent},];
];

@NgModule({
  declarations: [NotFoundComponent, ExpenseDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    ExpenseDetailComponent,
    CommonModule,
  ]
})
export class SharedModule { }
