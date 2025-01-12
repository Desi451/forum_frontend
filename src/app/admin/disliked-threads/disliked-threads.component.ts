import { Component, OnInit } from '@angular/core';
import { ThreadListPagination } from '../../models/thread';
import { ThreadService } from '../../core/services/thread-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-disliked-threads',
  templateUrl: './disliked-threads.component.html',
  styleUrl: './disliked-threads.component.scss'
})
export class DislikedThreadsComponent implements OnInit {

  public threads: ThreadListPagination = {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 2
  };
  displayedColumns: string[] = [
    'title',
    'author',
    'creationDate',
    'actions'
  ];


  constructor(
    private threadService: ThreadService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  handlePageEvent(e: PageEvent) {
    this.threads.totalCount = e.length;
    this.threads.pageSize = e.pageSize;
    this.threads.currentPage = e.pageIndex + 1;
    this.loadData();
  }

  private loadData() {
    this.threadService.getDislikedThreads(this.threads.currentPage, this.threads.pageSize).subscribe({
      next: (data) => {
        this.threads = data;
      },
      error: (err) => {
        this.threads.data = [];
        console.error('load failed', err);
      }
    });
  }

  public loadThread(id: number) {
    this.router.navigateByUrl('/thread/' + id);
  }

  public RemoveThread(id: number) {
    this.threadService.deleteThread(id).subscribe({
      next: (response) => {
        console.log(response);
        this.loadData();
      },
      error: (err) => {
        console.error('delete failed', err);
      }
    });
  }
}

