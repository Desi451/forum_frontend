import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
        next: (response) => {
            this.authService.saveToken(response.token);
            console.log('Logged in!');
        },
        error: (err) => {
            console.error('Login failed', err);
        }
    });
}
}
