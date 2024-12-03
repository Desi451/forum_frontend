import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../core/auth/auth-service";
import { loginUser } from "../../models/user";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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

  onSubmit() {
    this.login();
  }

  login() {
    const data: loginUser = {
      loginOrEmail: this.loginForm.value.login,
      password: this.loginForm.value.password
    };

    this.authService.login(data).subscribe({
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
