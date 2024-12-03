import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../../core/auth/auth-service";
import { UserService } from "../../core/services/user-service";
import { updateMail, updatePassword, updateUserParam } from "../../models/user";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  nickNameForm!: FormGroup;
  mailForm!: FormGroup;
  passwordForm!: FormGroup;
  conPasswordForm!: FormGroup;
  srcResult: any;
  userData: any;
  confirmForm: boolean = false;
  isPassword: boolean = false;
  editFormImage = this.imb.group({
    photo: ['assets/defaultAV.png']
  });

  constructor(private fb: FormBuilder,
    private imb: UntypedFormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.userData = this.authService.getUserData();
    console.log('User data:', this.userData);
    this.nickNameForm = this.fb.group({
      nickname: [this.userData.UserNickname || '', [Validators.required, Validators.minLength(3)]],
    });

    this.mailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.conPasswordForm = this.fb.group({
      conPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    if (this.userData.UserPFP != "TutajBędzieŚcieżkaDoDomyślnegoPFF.png") {
      this.editFormImage = this.userData.UserPFP;
    }
  }

  saveNickname(): void {
    if (this.nickNameForm.valid) {
      const data: updateUserParam = {
        id: this.userData.UserID,
        param: this.nickNameForm.value.nickname,
      }

      this.userService.updateNickname(data).subscribe({
        next: () => {
          console.log('Nickname changed!');
        },
        error: (err) => {
          console.error('update failed', err);
        }
      });
    }
  }

  savePassword(): void {
    if (this.passwordForm.valid) {
      this.isPassword = true;
      this.confirmForm = true;
    }
  }

  saveMail(): void {
    if (this.mailForm.valid) {
      this.confirmForm = true;
    }
  }

  confirmSave(): void {
    if (this.isPassword && this.passwordForm.valid && this.conPasswordForm.valid) {
      const data: updatePassword = {
        id: this.userData.UserID,
        newPassword: this.passwordForm.value.password,
        oldPassword: this.conPasswordForm.value.conPassword
      }
      this.userService.updatePassword(data).subscribe({
        next: () => {
          console.log('password changed!');
        },
        error: (err) => {
          console.error('update failed', err);
        }
      });
    }
    else if (!this.isPassword && this.mailForm.valid && this.conPasswordForm.valid) {
      const dataMail: updateMail = {
        id: this.userData.UserID,
        newEMail: this.mailForm.value.email,
        password: this.conPasswordForm.value.conPassword
      }
      this.userService.updateMail(dataMail).subscribe({
        next: (response) => {
          console.log('mail changed!');
        },
        error: (err) => {
          console.error('update failed', err);
        }
      });
    }
    this.clearData();
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.editFormImage.get('photo')?.setValue(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  }

  clearData(): void {
    this.conPasswordForm.reset();
    this.confirmForm = false;
  }
}
