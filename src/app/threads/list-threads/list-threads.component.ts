import { Component, OnInit } from '@angular/core';
import { ThreadListPagination } from '../../models/thread';
import { ThreadService } from '../../core/services/thread-service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-threads',
  templateUrl: './list-threads.component.html',
  styleUrl: './list-threads.component.scss'
})
export class ListThreadsComponent implements OnInit {
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
    private router: Router
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
    this.threadService.getThreads(this.data.currentPage, this.data.pageSize).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error('load failed', err);
      }
    });
  }

  isChecked = false;

  onChange(threadId: number) {
    this.threadService.subscribeThread(threadId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('subscribe failed', err);
      }
    });
  }
}
