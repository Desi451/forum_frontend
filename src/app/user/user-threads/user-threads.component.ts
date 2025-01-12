import { Component, OnInit } from '@angular/core';
import { ThreadListPagination } from '../../models/thread';
import { ThreadService } from '../../core/services/thread-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { SnackBarService } from '../../core/services/snackbar-service';

@Component({
  selector: 'app-user-threads',
  templateUrl: './user-threads.component.html',
  styleUrl: './user-threads.component.scss'
})
export class UserThreadsComponent implements OnInit {
  public data: ThreadListPagination = {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 2
  };
  defaultImage: string = 'assets/defaultThread.png';

  constructor(
    private threadService: ThreadService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  onDetails(threadId: number): void {
    if (threadId) {
      this.router.navigate(['/threads', threadId]);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.data.totalCount = e.length;
    this.data.pageSize = e.pageSize;
    this.data.currentPage = e.pageIndex + 1;
    this.loadData();
  }

  loadData(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const numericUserId = Number(userId);
    this.threadService.getUserThreads(numericUserId, this.data.currentPage, this.data.pageSize).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }

  public RemoveThread(id: number) {
    this.threadService.deleteThread(id).subscribe({
      next: (response) => {
        this.snackBarService.openSnackBar('Thread deleted!', 'Ok');
        this.loadData();
      },
      error: (err) => {
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }
}
