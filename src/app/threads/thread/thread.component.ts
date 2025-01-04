import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from '../../core/services/thread-service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent implements OnInit {

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
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.threadService.getThread(id).subscribe({
      next: (data) => {
        this.data = data;
        console.log(data);
      },
      error: (err) => {
        console.error('load failed', err);
      }
    });
  }

  currentIndex: number = 0; // Start from the first image (index 0)

  goToNext(): void {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
    }
  }

  goToPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
