import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";

import { addUser, loginUser } from "../../models/user";
import { environment } from "../enviroment";
import { jwtDecode } from "jwt-decode";

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

  refresh(): Observable<any> {
    return this.http.get(`${environment.apiUrl}auth/refresh-token`);
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', token);
      this.saveUserData(jwtDecode(token));
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  saveUserData(userData: any): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      this.refresh().subscribe({
        next: () => {
          const data = sessionStorage.getItem('userData');
          return data ? JSON.parse(data) : null;
        }
      })
    }
    else {
      return "session not found";
    }
  }
}
