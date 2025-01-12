import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThreadService } from '../../core/services/thread-service';
import { AuthService } from '../../core/auth/auth-service';
import { createSubThread } from '../../models/thread';
import { SnackBarService } from '../../core/services/snackbar-service';


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
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: { parentId: number },
  ) {
    this.threadForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const id = this.authService.getUserId();
    if (this.threadForm.valid && id) {
      const thread: createSubThread = {
        description: this.threadForm.value.description,
        images: this.selectedFiles,
        parentId: this.data.parentId,
        userId: id
      }

      this.threadService.addSub(thread).subscribe({
        next: (response) => {
          this.snackBarService.openSnackBar('Commet added!', 'Ok');
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });

    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
