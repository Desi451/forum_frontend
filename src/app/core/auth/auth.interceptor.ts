import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authService.goForbidden();
          return this.authService.refresh().pipe(
            switchMap((newToken: any) => {
              if (newToken && newToken.token) {
                this.authService.saveToken(newToken.token);
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken.token}`
                  }
                });
                return next.handle(request);
              }
              return throwError('Unable to refresh token');
            }),
            catchError(err => {
              this.authService.logout();
              return throwError(err);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
