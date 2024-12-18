import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { addUser, loginUser } from "../../models/user";
import { environment } from "../enviroment";
import { jwtDecode } from "jwt-decode";
import { get } from "node:http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getToken() !== null);

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  login(login: loginUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/login`, login).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);  // Zapisz token w sessionStorage
          this.loggedInSubject.next(true);  // Ustaw stan zalogowania na true
        }
      })
    );
  }
  register(newUser: addUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/register`, newUser);
  }

  refresh(): Observable<any> {
    //return this.http.get(`${environment.apiUrl}auth/refresh-token`);

    const token = this.getToken();
    console.log("Token: " + token);
    return this.http.get(`${environment.apiUrl}auth/refresh-token`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
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
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');  // Usuń token
      sessionStorage.removeItem('userData');  // Usuń dane użytkownika (jeśli zapisane)
      this.loggedInSubject.next(false);  // Ustaw stan zalogowania na false
    }
  }

  saveUserData(userData: any): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = sessionStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
