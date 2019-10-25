import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { Routes, RouterModule } from '@angular/router';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'forget_password', component:ForgetPasswordComponent},
];

@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule, //Forms Module has to be imported in all the modules with components containing forms.
    RouterModule.forChild(routes),
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class UserModule { }
