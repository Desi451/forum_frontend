import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";

import { UserService } from "../../core/services/user-service";
import { updateMail, updateNickname, updatePassword, user } from "../../models/user";
import { ActivatedRoute } from "@angular/router";
import { SnackBarService } from "../../core/services/snackbar-service";

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
  userData: user | undefined;
  confirmForm: boolean = false;
  isPassword: boolean = false;
  editFormImage = this.imb.group({
    photo: []
  });

  constructor(private fb: FormBuilder,
    private imb: UntypedFormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.initializeForms();
    const userId = this.route.snapshot.paramMap.get('id');
    const numericUserId = Number(userId);
    if (numericUserId) {
      this.userService.get(numericUserId).subscribe({
        next: (data) => {
          this.userData = data;
          this.nickNameForm.patchValue({
            nickname: data.nickname
          })

          this.mailForm.patchValue({
            email: data.mail
          })
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });

      this.userService.getUserProfilePicture(numericUserId).subscribe({
        next: (data) => {
          if (data) {
            this.editFormImage.get('photo')?.setValue(data.profilePictureUrl);
          }
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    }

  }

  initializeForms(): void {
    this.nickNameForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
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

    if (this.userData?.profilePicture) {
      this.editFormImage = this.imb.group({
        photo: [this.userData.profilePicture]
      });
    }
  }

  saveNickname(): void {
    if (this.nickNameForm.valid && this.userData) {
      const data: updateNickname = {
        id: this.userData?.id,
        nickname: this.nickNameForm.value.nickname,
      }

      this.userService.updateNickname(data).subscribe({
        next: () => {
          this.snackBarService.openSnackBar('Nickname changed!', 'Ok');
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
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
    if (this.isPassword && this.passwordForm.valid && this.conPasswordForm.valid && this.userData) {
      const data: updatePassword = {
        id: this.userData.id,
        newPassword: this.passwordForm.value.password,
        oldPassword: this.conPasswordForm.value.conPassword
      }
      this.userService.updatePassword(data).subscribe({
        next: () => {
          this.snackBarService.openSnackBar('Password changed!', 'Ok');
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    }
    else if (!this.isPassword && this.mailForm.valid && this.conPasswordForm.valid && this.userData) {
      const dataMail: updateMail = {
        id: this.userData.id,
        newEMail: this.mailForm.value.email,
        password: this.conPasswordForm.value.conPassword
      }
      this.userService.updateMail(dataMail).subscribe({
        next: (response) => {
          this.snackBarService.openSnackBar('Mail Changed!', 'Ok');
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
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
        if (this.userData && eventTarget?.files?.[0]) {
          this.userService.updatePfp(this.userData.id, eventTarget.files[0]).subscribe({
            next: (response) => {
              this.snackBarService.openSnackBar('Image Changed!', 'Ok');
            },
            error: (err) => {
              this.snackBarService.handleErrors(err.error, 'Ok');
            }
          })
        }
      });
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.editFormImage.get('photo')?.setValue(null)
    if (this.userData) {
      this.userService.deletePfp(this.userData.id).subscribe({
        next: (response) => {
          this.snackBarService.openSnackBar('Image Removed!', 'Ok');
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      })
    }
  }

  clearData(): void {
    this.conPasswordForm.reset();
    this.confirmForm = false;
  }
}
