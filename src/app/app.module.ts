import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//https://ng-bootstrap.github.io/#/getting-started
//import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap'; //https://ng-bootstrap.github.io/#/components/datepicker/overview
// NgbModule is for all, but since only NgbDatepicker is needed so importing only a part.


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    NgbModule,
    /*
    * HttpClient is Angular's mechanism for communicating with a remote server over HTTP.
    * it communicates with the back-end HTTP server or a third-party server that has CORS enabled.
    */
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      maxOpened:2,
      autoDismiss:true,
      preventDuplicates:true,
      countDuplicates:true,
      closeButton:true,
      timeOut: 2000,
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
