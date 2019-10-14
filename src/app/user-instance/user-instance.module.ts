import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserSpendzComponent } from './user-spendz/user-spendz.component';



@NgModule({
  declarations: [UserHomeComponent, UserFriendsComponent, UserLogoutComponent, UserSpendzComponent],
  imports: [
    CommonModule
  ]
})
export class UserInstanceModule { }
