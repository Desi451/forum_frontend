import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin-service';
import { BannedUserListPagination } from '../../models/admin';
import { PageEvent } from '@angular/material/paginator';
import { AcceptFormComponent } from '../../shared/accept-form/accept-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { SnackBarService } from '../../core/services/snackbar-service';

@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrl: './banned-users.component.scss'
})
export class BannedUsersComponent implements OnInit {

  public bannedUsers: BannedUserListPagination = {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 2
  };
  displayedColumns: string[] = [
    'bannedUserNickname',
    'baneedUserEMail',
    'reason',
    'dateOfBan',
    'bannedUntil',
    'adminNickname',
    'actions'
  ];

  constructor(private adminService: AdminService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  handlePageEvent(e: PageEvent) {
    this.bannedUsers.totalCount = e.length;
    this.bannedUsers.pageSize = e.pageSize;
    this.bannedUsers.currentPage = e.pageIndex + 1;
    this.loadData();
  }

  private loadData() {
    this.adminService.getBannedUsers(this.bannedUsers.pageSize, this.bannedUsers.currentPage).subscribe({
      next: (data) => {
        this.bannedUsers.data = data;
      },
      error: (err) => {
        this.bannedUsers.data = [];
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }

  public unbanUser(userId: number) {
    this.dialog.open(AcceptFormComponent, {})
      .afterClosed()
      .pipe(
        filter(result => result === true),
        switchMap(() => this.adminService.unbanUser(userId))
      )
      .subscribe({
        next: () => {
          this.loadData();
          this.snackBarService.openSnackBar('User unbanned!', 'Ok');
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
  }
}
