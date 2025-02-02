import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../core/services/admin-service';
import { SnackBarService } from '../../core/services/snackbar-service';
import { BanReason } from '../../models/admin';

@Component({
  selector: 'app-ban-modal',
  templateUrl: './ban-modal.component.html',
  styleUrl: './ban-modal.component.scss'
})
export class BanModalComponent {
  banReason: string = '';
  banExpirationDate: Date | null = null;
  id: number;

  constructor(private dialogRef: MatDialogRef<BanModalComponent>,
    private adminService: AdminService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = this.data;
  }

  confirmBan(): void {
    if (!this.banReason || !this.banExpirationDate || !this.id) {
      this.snackBarService.openSnackBar('Please provide both a reason and a date for the ban', 'Ok');
      return;
    }

    const res: BanReason = {
      reason: this.banReason,
      bannedUntil: this.banExpirationDate.toISOString()
    }
    this.adminService.banUser(this.id, res).subscribe({
      next: () => {
        this.close(true);
        this.snackBarService.openSnackBar('User banned!', 'Ok');
      },
      error: (err) => {
        this.close(false);
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }

  close(res: boolean): void {
    this.dialogRef.close(res);
  }
}
