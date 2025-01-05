import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThreadService } from '../../core/services/thread-service';
import { AuthService } from '../../core/auth/auth-service';
import { createSubThread } from '../../models/thread';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  threadForm: FormGroup;
  selectedFiles: File[] = [];
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private threadService: ThreadService,
    public dialogRef: MatDialogRef<CommentFormComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { parentId: number },
  ) {
    console.log(data);
    this.threadForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.data.parentId);
    const id = this.authService.getUserId();
    if (this.threadForm.valid && id) {
      console.log('Form data:', this.threadForm.value);
      const thread: createSubThread = {
        description: this.threadForm.value.description,
        images: this.selectedFiles,
        parentId: this.data.parentId,
        userId: id
      }

      this.threadService.addSub(thread).subscribe({
        next: (response) => {
          console.log('comment added');
        },
        error: (err) => {
          console.error('error while adding comment', err);
        }
      });

    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      console.log('Selected files:', this.selectedFiles);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
