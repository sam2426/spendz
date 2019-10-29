import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from './../../services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(
    public cookieService: CookieService,
    public navBar: NavbarService,
    public router: Router,
  ) { }

  ngOnInit() {
    // this.navBar.getLoginStatus().subscribe(status => this.isLoggedIn = status);
// console.log(this.cookieService.get('authToken')=='');
    if (!(this.cookieService.get('authToken')=='')) {
      this.router.navigate(['/user-home/', this.cookieService.get('userId')]);
    }else{
      this.router.navigate(['/home']);
    }

  }
}