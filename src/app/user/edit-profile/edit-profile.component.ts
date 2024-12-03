import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";

import { UserService } from "../../core/services/user-service";
import { updateImage, updateMail, updateNickname, updatePassword, user } from "../../models/user";
import { read } from "fs";

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
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.userService.get(4).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error('update failed', err);
      }
    })

    console.log('User data:', this.userData);


    this.nickNameForm = this.fb.group({
      nickname: [this.userData?.nickname || '', [Validators.required, Validators.minLength(3)]],
    });

    this.mailForm = this.fb.group({
      email: [this.userData?.mail || '', [Validators.required, Validators.email]],
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
    if (this.isPassword && this.passwordForm.valid && this.conPasswordForm.valid && this.userData) {
      const data: updatePassword = {
        id: this.userData.id,
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
    else if (!this.isPassword && this.mailForm.valid && this.conPasswordForm.valid && this.userData) {
      const dataMail: updateMail = {
        id: this.userData.id,
        newEMail: this.mailForm.value.email,
        password: this.conPasswordForm.value.conPassword
      }
      console.log(dataMail);
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
        if (this.userData && eventTarget?.files?.[0]) {
          this.userService.updatePfp(this.userData.id, eventTarget.files[0]).subscribe({
            next: (response) => {
              console.log('image changed!');
            },
            error: (err) => {
              console.error('update failed', err);
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
          console.log(response);
        },
        error: (err) => {
          console.error('update failed', err);
        }
      })
    }
  }

  clearData(): void {
    this.conPasswordForm.reset();
    this.confirmForm = false;
  }
}
