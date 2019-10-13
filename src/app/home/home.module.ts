import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'home', component:HomeComponent,pathMatch:'full'},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'*', component:HomeComponent},
  {path:'**', component:HomeComponent},];
  // {path:'not-found', component:NotFoundComponent}];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
