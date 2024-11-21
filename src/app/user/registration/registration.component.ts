import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { error } from "console";

import { AuthService } from "../../core/auth/auth-service";
import { addUser } from "../../models/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const res: addUser = {
        login: this.registerForm.value.login,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      this._authService.register(res).subscribe(
        (error) => {
          console.error("registration not succesful: " + error);
        }
      )
    }
  }
}
