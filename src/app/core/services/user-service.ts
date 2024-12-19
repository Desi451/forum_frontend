import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { updateImage, updateMail, updateNickname, updatePassword, user } from "../../models/user";
import { environment } from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateNickname(data: updateNickname): Observable<any> {
    return this.http.patch(`${environment.apiUrl}user/update-nickname/${data.id}`, data);
  }

  updatePassword(password: updatePassword): Observable<any> {
    return this.http.patch(`${environment.apiUrl}user/update-password/${password.id}`, password);
  }

  updateMail(mail: updateMail): Observable<any> {
    return this.http.patch(`${environment.apiUrl}user/update-email/${mail.id}`, mail);
  }

  updatePfp(id: number, image: any): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', image);
    return this.http.patch(`${environment.apiUrl}user/update-pfp/${id}`, formData);
  }

  deletePfp(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}user/delete-pfp/${id}`);
  }

  get(id: number): Observable<user> {
    return this.http.get<user>(`${environment.apiUrl}user/${id}`);
  }

  getUserProfilePicture(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}user/${id}/profile-picture`);
  }
}
