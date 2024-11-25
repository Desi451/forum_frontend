import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  profileEditForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileEditForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePicture: [null] // Optional
    });
  }

  onProfileSubmit(): void {
    if (this.profileEditForm.valid) {
      const profileData = this.profileEditForm.value;

      // Możesz wysłać dane na serwer lub wyświetlić w konsoli
      console.log('Profile Data Submitted:', profileData);

      // Dodatkowo: np. wyświetlenie powiadomienia lub przekierowanie
      alert('Profile updated successfully!');
    } else {
      console.log('Form is invalid');
    }
  }
}
