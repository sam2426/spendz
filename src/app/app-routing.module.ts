import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { UserInstanceModule } from './user-instance/user-instance.module';

const routes: Routes = [];

@NgModule({
  declarations: [
    //any component to be added declare here.
  ],
  imports: [
    HomeModule,
    SharedModule,
    UserModule,
    UserInstanceModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
