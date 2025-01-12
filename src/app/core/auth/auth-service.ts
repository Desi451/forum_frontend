import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { addUser, CustomJwtPayload, loginUser } from "../../models/user";
import { environment } from "../enviroment";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getToken() !== null);
  private adminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getToken() !== null);

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  login(login: loginUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/login`, login).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  register(newUser: addUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}auth/register`, newUser);
  }

  refresh(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${environment.apiUrl}auth/refresh-token`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', token);

      const userData = jwtDecode<CustomJwtPayload>(token);
      const userDataString = JSON.stringify(userData);
      sessionStorage.setItem('userData', userDataString);
      if (userData.UserRole == '1') {
        this.adminSubject.next(true);
      }

      this.loggedInSubject.next(true);
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
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userData');
      this.loggedInSubject.next(false);
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

  getUserId(): number | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const data = sessionStorage.getItem('userData');
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          return parsedData.UserID ? +parsedData.UserID : undefined;
        } catch (error) {
          console.error('Error parsing userData:', error);
        }
      }
    }
    return undefined;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  get isAdmin$(): Observable<boolean> {
    return this.adminSubject.asObservable();
  }
}
