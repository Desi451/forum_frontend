import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../../core/services/thread-service';
import { CommentFormComponent } from '../../shared/comment-form/comment-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent implements OnInit {

  threadId: number | undefined;
  data: any = {
    image: '',
    title: '',
    author: '',
    creationDate: null,
    description: '',
    tags: [],
    images: []
  };

  defaultImage: string = 'assets/defaultThread.png';

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

  openForm(): void {
    const dialogRef = this.dialog.open(CommentFormComponent, {
      width: '600px',
      data: { parentId: this.threadId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Thread data submitted:', result);
      }
    });
  }
}
