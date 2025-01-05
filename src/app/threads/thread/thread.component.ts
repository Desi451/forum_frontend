import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../../core/services/thread-service';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { MatDialog } from '@angular/material/dialog';
import { thread } from '../../models/thread';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent implements OnInit {
  @Input() thread: any;
  @Input() parentThread: boolean = false;
  threadId: number | undefined;
  data: thread = {
    threadId: 0,
    image: '',
    title: '',
    authorNickname: '',
    authorId: 0,
    creationDate: undefined,
    description: '',
    tags: [],
    images: [],
    subthreads: []
  };

  defaultImage: string = 'assets/defaultThread.png';

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  currentIndex: number = 1;

  goToNext(): void {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
    }
  }

  goToPrevious(): void {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
  }

  openForm(threadId: number): void {
    const dialogRef = this.dialog.open(CommentFormComponent, {
      width: '600px',
      data: { parentId: threadId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Thread data submitted:', result);
      }
      this.loadData();
    });
  }

  loadData(): void {
    if (!this.thread) {
      this.threadId = Number(this.route.snapshot.paramMap.get('id'));
      this.threadService.getThread(this.threadId).subscribe({
        next: (data) => {
          this.data = data;
          console.log(data);
        },
        error: (err) => {
          console.error('load failed', err);
        }
      });
    } else {
      this.data = this.thread;
    }
  }
}
