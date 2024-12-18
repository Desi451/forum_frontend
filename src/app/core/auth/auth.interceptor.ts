import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }


  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.authService.getToken();

  //   if (token) {
  //     request = this.addToken(request, token);
  //   }

  //   return next.handle(request).pipe(
  //     catchError(error => {
  //       if (error.status === 401 && !request.url.includes('/auth/refresh-token')) {
  //         return this.handle401Error(request, next);
  //       }
  //       return throwError(error);
  //     })
  //   );
  // }

  // private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  //   return request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.authService.refresh().pipe(
  //       switchMap((newToken: any) => {
  //         this.isRefreshing = false;
  //         this.authService.saveToken(newToken.token);
  //         this.refreshTokenSubject.next(newToken.token);
  //         return next.handle(this.addToken(request, newToken.token));
  //       }),
  //       catchError(err => {
  //         this.isRefreshing = false;
  //         this.authService.logout();
  //         return throwError(err);
  //       })
  //     );
  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token !== null),
  //       take(1),
  //       switchMap(token => next.handle(this.addToken(request, token!)))
  //     );
  //   }
  // }

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
          return this.authService.refresh().pipe(
            switchMap((newToken: any) => {
              if (newToken && newToken.token) {
                this.authService.saveToken(newToken.token);
                console.log(newToken.token);
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
