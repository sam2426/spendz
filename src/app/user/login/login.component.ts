import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  public isLoggedIn = false
  role = ''
  userId = ''

  constructor(
    public toastr: ToastrService,
    public appService: AppService,
    public router: Router,
    public cookie: CookieService,
    public navbarService: NavbarService
  ) {
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit() {
  }

  public goToUser() {
    this.router.navigate(['/user-home/', this.userId]);
  }

  public forgetPassword() {
    console.log("forgot");
    this.router.navigate(['/forget_password']);
  }

  public logInFunction: any = () => {
    if (!this.password) {
      this.toastr.warning('enter password');
    } else if (!this.email) {
      this.toastr.warning('enter email');
    } else {
      let data = {
        email: this.email,
        password: this.password
      }
      console.log(data);

      this.appService.loginFunction(data).subscribe((apiResponse) => {
        console.log(apiResponse);

        if (apiResponse.status === 200) {
          this.cookie.set('authToken', apiResponse.data.authToken);
          this.cookie.set('userId', apiResponse.data.userDetails.userId);
          this.cookie.set('userName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
          this.cookie.set('firstName', apiResponse.data.userDetails.firstName);
          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
          this.navbarService.updateNavAfterAuth('user');
          this.navbarService.updateLoginStatus(true);
          this.role = 'user';
          this.userId = apiResponse.data.userDetails.userId;
          this.toastr.success(apiResponse.message);
          this.goToUser();
        }
        else {
          this.toastr.error(apiResponse.message);
        }
      })
    }
  }

}
