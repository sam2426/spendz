import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserSpendzComponent } from './user-spendz/user-spendz.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'user-home/:userId', component:UserHomeComponent},
  {path:'user-spendz/:userId',component:UserSpendzComponent},
  // {path:'user-friends-todos',component:UserFriendsTodosComponent},
  {path:'user-friends',component:UserFriendsComponent},
  {path:'user-logout',component:UserLogoutComponent},
  // {path:'user-feedback',component:UserFeedbackComponent}
 
];

@NgModule({
  declarations: [UserHomeComponent, UserFriendsComponent, UserLogoutComponent, UserSpendzComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserInstanceModule { }
