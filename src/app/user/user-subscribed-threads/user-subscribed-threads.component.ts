import { Component, OnInit } from '@angular/core';
import { ThreadListPagination } from '../../models/thread';
import { ThreadService } from '../../core/services/thread-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-subscribed-threads',
  templateUrl: './user-subscribed-threads.component.html',
  styleUrl: './user-subscribed-threads.component.scss'
})
export class UserSubscribedThreadsComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  onDetails(threadId: number): void {
    if (threadId) {
      this.router.navigateByUrl('/thread/' + threadId);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.data.totalCount = e.length;
    this.data.pageSize = e.pageSize;
    this.data.currentPage = e.pageIndex + 1;
    this.loadData();
  }

  loadData(): void {
    this.threadService.getUserSubedThreads(this.data.currentPage, this.data.pageSize).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error('load failed', err);
      }
    });
  }

  onChange(threadId: number) {
    this.threadService.subscribeThread(threadId).subscribe({
      next: (res) => {
        console.log(res);
        this.loadData();
      },
      error: (err) => {
        console.error('subscribe failed', err);
      }
    });
  }
}
