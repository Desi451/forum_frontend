import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5000/api/auth';

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { username, password });
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
