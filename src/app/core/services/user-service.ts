import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { updateImage, updateMail, updatePassword, updateUserParam } from "../../models/user";
import { environment } from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateNickname(data: updateUserParam): Observable<any> {
    return this.http.patch(`${environment.apiUrl}user/update-nickname/${data.id}`, data);
  }

  updatePassword(password: updatePassword): Observable<any> {
    return this.http.patch(`${environment.apiUrl}user/update-password/${password.id}`, password);
  }

  updateMail(mail: updateMail): Observable<any> {
    return this.http.patch(`${environment.apiUrl}user/update-email/${mail.id}`, mail);
  }

  updatePfp(pfp: updateImage): Observable<any> {
    return this.http.patch(`${environment.apiUrl}user/update-pfp`, pfp);
  }

  deletePfp(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}user/update-pfp/${id}`);
  }

}
