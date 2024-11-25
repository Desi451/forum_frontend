import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { updateUserParam } from "../../models/user";
import { environment } from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateNickname(login: updateUserParam): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/update-nickname`, login);
  }

  updatePassword(password: updateUserParam): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/update-login`, password);
  }

  updateMail(mail: updateUserParam): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/update-login`, mail);
  }

  //tutaj blob wjebac bratku albo ifile
  updatePfp(pfp: updateUserParam): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/update-pfp`, pfp);
  }
}
