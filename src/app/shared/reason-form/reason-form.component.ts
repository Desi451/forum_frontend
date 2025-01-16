import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '../../core/services/snackbar-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-reason-form',
  templateUrl: './reason-form.component.html',
  styleUrl: './reason-form.component.scss'
})
export class ReasonFormComponent {
  reasonForm: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReasonFormComponent>,
    private snackBarService: SnackBarService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reasonForm = this.fb.group({
      reason: ['', Validators.required],
    });
    this.id = data.id;
  }

  onSubmit(): void {
    console.log("wchodze")
    console.log(this.reasonForm.valid);
    console.log(this.reasonForm.value.reason);
    if (this.reasonForm.valid) {
      const reason = this.reasonForm.value.reason;
      this.userService.reportUser(this.id, reason).subscribe({
        next: () => {
          this.close();
          this.snackBarService.openSnackBar('Sumbitted!', 'Ok');
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
