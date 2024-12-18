import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'forum_frontend';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.refresh().subscribe({
    //   next: (response) => {
    //     const newToken = response?.token;
    //     this.authService.saveToken(newToken);
    //     const token = this.authService.getToken();
    //     console.log('Initial token:', token);
    //   },
    //   error: (err) => {
    //     console.error('Failed to refresh token:', err);
    //   }
    // });
  }
}
