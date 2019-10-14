import { Component, OnInit } from '@angular/core';
import { Router,Event, NavigationStart, NavigationEnd } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { AppService } from './services/app.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public links: Array<{ text: string, path: string }>;
  public isLoggedIn:boolean;
  public thisYear;
  public showLoader:boolean=false;

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private appService: AppService,
    private cookies: CookieService,
    public toastr: ToastrService,
    
  ) {
    this.router.events.subscribe((routerEvent:Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.showLoader=true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showLoader=false;
      }
    })

      if(!(this.cookies.get('authToken'))){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
    }
    this.thisYear=new Date().getFullYear();
  }

  ngOnInit() {
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  public logout: any = () => {

    // this.appService.logout().subscribe((apiResponse) => {

    //   if (apiResponse.status === 200) {
        console.log("logout called");

        this.cookies.delete('authToken');
        this.cookies.delete('userId');
        this.cookies.delete('userName');
        this.cookies.delete('firstName');
        // this.socket.exitSocket()
        this.navbarService.updateLoginStatus(false);
        this.router.navigate(['/']);
//need to show one modal for 2 seconds that logged out successfully.
    //   } else {
    //     this.toastr.error(apiResponse.message)
    //   } // end condition

    // }, (err) => {
    //   this.toastr.error('some error occured')
    // });
  } // end logout
}
