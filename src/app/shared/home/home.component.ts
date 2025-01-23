import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThreadService } from '../../core/services/thread-service';
import { ThreadListPagination } from '../../models/thread';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isHomePage: boolean = false;
  public data: ThreadListPagination = {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 2
  };
  defaultImage: string = 'assets/defaultThread.png';

  constructor(
    private router: Router,
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
    this.threadService.getTopThreads().subscribe(res => {
      this.data = res;
    });

    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/';
    });
  }

  onDetails(threadId: number): void {
    if (threadId) {
      this.router.navigateByUrl('threads/' + threadId);
    }
  }
}
