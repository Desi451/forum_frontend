import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { addUser, loginUser } from "../../models/user";
import { environment } from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login: loginUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}authorization/login`, login);
  }

  register(newUser: addUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}authorization/register`, newUser);
  }


  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
