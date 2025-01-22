import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../../core/services/thread-service';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { MatDialog } from '@angular/material/dialog';
import { thread } from '../../models/thread';
import { SnackBarService } from '../../core/services/snackbar-service';
import { ReasonFormComponent } from '../../shared/reason-form/reason-form.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent implements OnInit {
  @Input() thread: any;
  @Input() parentThread: boolean = false;
  threadId: number;
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
    subthreads: [],
    subscribe: false
  };

  public showSubthreads: boolean = false;

  public toggleSubthreads() {
    this.showSubthreads = !this.showSubthreads;
  }

  defaultImage: string = 'assets/defaultThread.png';

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { this.threadId = Number(this.route.snapshot.paramMap.get('id')); }

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
        this.loadData();
      }
    });
  }

  likeOrDislike(id: number, like: boolean) {

    let num;
    if (like) {
      num = 1
    }
    else {
      num = -1
    }
    this.threadService.likeDislike(this.threadId, num).subscribe({
      next: (data) => {
        this.data = data;
        this.snackBarService.openSnackBar('Sumbitted!', 'Ok');
      },
      error: (err) => {
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }

  loadData(): void {
    if (!this.thread) {
      this.threadId = Number(this.route.snapshot.paramMap.get('id'));
      this.threadService.getThread(this.threadId).subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    } else {
      this.data = this.thread;
    }
  }
}
