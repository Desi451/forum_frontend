import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin-service';
import { ReportedUserListPagination } from '../../models/admin';
import { PageEvent } from '@angular/material/paginator';
import { SnackBarService } from '../../core/services/snackbar-service';

@Component({
  selector: 'app-reported-users',
  templateUrl: './reported-users.component.html',
  styleUrl: './reported-users.component.scss'
})
export class ReportedUsersComponent implements OnInit {

  public reportedUsers: ReportedUserListPagination = {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 2
  };
  displayedColumns: string[] = [
    'reportId',
    'reportedUserNickname',
    'reportedUserMail',
    'reason',
    'reportDate',
    'reportingUserNickname',
    'actions'
  ];

  constructor(private adminService: AdminService,
    private snackBarService: SnackBarService
  ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  handlePageEvent(e: PageEvent) {
    this.reportedUsers.totalCount = e.length;
    this.reportedUsers.pageSize = e.pageSize;
    this.reportedUsers.currentPage = e.pageIndex + 1;
    this.loadData();
  }

  private loadData() {
    this.adminService.getReportedUsers(this.reportedUsers.pageSize, this.reportedUsers.currentPage).subscribe({
      next: (data) => {
        this.reportedUsers.data = data;
      },
      error: (err) => {
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }
}
