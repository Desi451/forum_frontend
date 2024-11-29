import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";

import { addUser, loginUser } from "../../models/user";
import { environment } from "../enviroment";
import { isPlatformBrowser } from "@angular/common";
import { error } from "console";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object

  ) { }

  login(login: loginUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/login`, login);
  }

  register(newUser: addUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/register`, newUser);
  }


  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  saveUserData(userData: any): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = sessionStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    }
    else{
      return "session not found";
    }
  }
}
