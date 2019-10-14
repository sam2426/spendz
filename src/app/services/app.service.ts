import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "localhost:3000/api/v1";

  constructor(public http: HttpClient, public cookies:CookieService) { }

  public getUserInfoFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage(data){
    return localStorage.setItem('userInfo',JSON.stringify(data));
  }

  public uploadImage(image:File):Observable<any>{
    const formData=new FormData();
    formData.append('image',image);
    
    return this.http.post(`${this.url}/users/uploadImage`, formData);
  }

  public signupFunction(data):Observable<any>{

    const params=new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('mobileNumber', data.mobile)
    .set('email', data.email)
    .set('password', data.password)
    .set('gender',data.gender)
    .set('profilePic',data.profilePic);

    return this.http.post(`${this.url}/users/signup`,params);
  }//end of signup function

  public loginFunction(data):Observable<any>{
    const params=new HttpParams()
    .set('email', data.email)
    .set('password',data.password);
    return this.http.post(`${this.url}/users/login`,params);
  }

  public forgetPassword(data):Observable<any>{
    const params=new HttpParams()
    .set('email',data.email);
    return this.http.post(`${this.url}/users/forgetPassword`,params);
  }

  public resetPassword(data):Observable<any>{
    const params=new HttpParams()
    .set('email',data.email)
    .set('otp',data.otp)
    .set('password',data.password);
    return this.http.post(`${this.url}/users/resetPassword`,params);
  }

  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.cookies.get('authtoken'));
    return this.http.post(`${this.url}/users/logout`, params);
  } // end logout function

  public userList(userId):Observable<any>{
    return this.http.get(`${this.url}/users/${userId}/allUsers`);
   }
 
   public friendList(userId):Observable<any>{
     return this.http.get(`${this.url}/users/${userId}/allFriends`);
    }
 
   public getSingleUser(userId):Observable<any>{
     //passing the id for which data is needed.
     return this.http.get(`${this.url}/users/${userId}/details`);
   }

   public addFriend(userId,friendId):Observable<any>{
    const params=new HttpParams()
    .set('receiverUserId',friendId)
    .set('senderUserId',userId)
    return this.http.post(`${this.url}/users/addFriend`,params);
  }

  public acceptReq(userId,friendId):Observable<any>{
    const params=new HttpParams()
    .set('receiverUserId',friendId)
    .set('senderUserId',userId)
    return this.http.post(`${this.url}/users/acceptReq`,params);
  }

  public deleteReq(userId,friendId):Observable<any>{
    const params=new HttpParams()
    .set('receiverUserId',friendId)
    .set('senderUserId',userId)
    return this.http.post(`${this.url}/users/delReq`,params);
  }
}
