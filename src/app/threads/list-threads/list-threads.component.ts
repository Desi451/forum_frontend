import { Component, OnInit } from '@angular/core';
import { thread } from '../../models/thread';

@Component({
  selector: 'app-list-threads',
  templateUrl: './list-threads.component.html',
  styleUrl: './list-threads.component.scss'
})
export class ListThreadsComponent implements OnInit {

  ngOnInit(): void {

  }

  onDetails(threadId: number): void {
    console.log('Thread ID:', threadId);
  }

  threads: thread[] = [
    {
      id: 1,
      authorId: 101,
      author: 'JohnDoe',
      title: 'Understanding TypeScript',
      description: 'A comprehensive guide to mastering TypeScript in web development.',
      tags: ['typescript', 'programming', 'webdev'],
      creationDate: new Date('2024-01-10'),
    },
    {
      id: 2,
      authorId: 102,
      author: 'JaneSmith',
      title: 'Angular vs React: A Comparison',
      description: 'An in-depth comparison of Angular and React for modern web applications.',
      tags: ['angular', 'react', 'frontend'],
      creationDate: new Date('2024-02-15'),
    },
    {
      id: 3,
      authorId: 103,
      author: 'DevGuru',
      title: '10 Tips for Writing Clean Code',
      description: 'Learn how to write clean, maintainable, and efficient code with these 10 tips.',
      tags: ['coding', 'best-practices', 'development'],
      creationDate: new Date('2024-03-05'),
    }
  ];
}
