import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../core/services/admin-service';
import { banUser } from '../../models/user';
import { SnackBarService } from '../../core/services/snackbar-service';

@Component({
  selector: 'app-ban-modal',
  templateUrl: './ban-modal.component.html',
  styleUrl: './ban-modal.component.scss'
})
export class BanModalComponent {
  banReason: string = '';
  banExpirationDate: Date | null = null;
  id!: number;

  constructor(private dialogRef: MatDialogRef<BanModalComponent>,
    private adminService: AdminService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.id = this.data.id;
  }

  confirmBan(): void {
    if (!this.banReason || !this.banExpirationDate || this.id) {
      this.snackBarService.openSnackBar('Please provide both a reason and a date for the ban', 'Ok');
      return;
    }

    const res: banUser = {
      reason: this.banReason,
      bannedUntil: this.banExpirationDate
    }

    this.adminService.banUser(this.id, res).subscribe({
      next: () => {
        this.close();
        this.snackBarService.openSnackBar('User banned!', 'Ok');
      },
      error: (err) => {
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
