import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private links = new Array<{ text: string, path: string }>();
  private isLoggedIn = new Subject<boolean>();

  constructor(public cookies: CookieService) {
    if (!(this.cookies.get('authToken'))) {
      this.isLoggedIn.next(false);
      this.addItem({ text: 'Home', path: '/home' });
      this.addItem({ text: 'SignUp', path: '/signup' });
      this.addItem({ text: 'Login', path: 'login' });
    }
    else {
      this.isLoggedIn.next(true);
      this.addItem({ text: `${this.cookies.get('firstName')}`, path: `user-home/${this.cookies.get('userId')}` });
      this.addItem({ text: 'My Expenses', path: `user-spendz/${this.cookies.get('userId')}` });
      // this.addItem({ text: 'Collaborate', path: 'user-friends-todos' });
      this.addItem({ text: 'Friends', path: 'user-friends' });
    }
  }

  getLinks() {
    return this.links;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);

    if (!status) {
      this.clearAllItems();
      this.addItem({ text: 'Home', path: '/home' });
      this.addItem({ text: 'SignUp', path: '/signup' });
      this.addItem({ text: 'Login', path: 'login' });
    }
  }

  updateNavAfterAuth(role: string): void {
    this.clearAllItems();

    if (role === 'user') {
      this.addItem({ text: `${this.cookies.get('firstName')}`, path: `user-home/${this.cookies.get('userId')}` });
      this.addItem({ text: 'My Expenses', path: `user-spendz/${this.cookies.get('userId')}` });
      // this.addItem({ text: 'Collaborate', path: 'user-friends-todos' });
      this.addItem({ text: 'Friends', path: 'user-friends' });
      // this.addItem({ text: 'Logout', path: 'user-logout' });
    } else if (role === 'admin') {
      this.addItem({ text: 'Admin Board', path: 'admin' });
    }
  }

  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }
}
