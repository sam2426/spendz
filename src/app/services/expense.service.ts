import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private url = "http://localhost:3000/api/v1";

  constructor(public http: HttpClient, public cookies:CookieService) { }

  public getUserGroups(userId):Observable<any>{
    //passing the id for which data is needed.
    return this.http.get(`${this.url}/expenses/${userId}/getGroup`);
  }

  public getGroupDetails(groupId):Observable<any>{
    return this.http.get(`${this.url}/expenses/${groupId}/getExpense`);
  }
}
