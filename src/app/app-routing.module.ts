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
    //since in app-routing module, there is only routes and no modules to declared, we can remove the array.
  ],
  imports: [
    HomeModule,
    UserModule,
    UserInstanceModule,
    SharedModule,
    RouterModule.forRoot(routes)],
    /*
    *The order of the routes in the configuration matters and this is by design. 
    *The router uses a first-match wins strategy when matching routes
    *Above if SharedModule is declared first, the notFoundComponent will always precede and show up first.
    * */
  exports: [RouterModule]
})
export class AppRoutingModule { }
