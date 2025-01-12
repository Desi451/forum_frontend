import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../core/auth/auth-service";
import { loginUser } from "../../models/user";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from "../../core/services/snackbar-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBarService: SnackBarService,
    private _snackBar: MatSnackBar
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
        this.router.navigate([`/`]);
        this._snackBarService.openSnackBar('Logged in!', 'Ok');;
      },
      error: (err) => {
        this._snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }
}
