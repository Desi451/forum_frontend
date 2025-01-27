import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../core/auth/auth-service";
import { ThreadService } from "../../core/services/thread-service";
import { createThread, editThread, thread } from "../../models/thread";
import { SnackBarService } from "../../core/services/snackbar-service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrl: './thread-form.component.scss'
})
export class ThreadFormComponent implements OnInit {
  threadForm!: FormGroup;
  selectedFiles: File[] = [];
  currentUser: any;
  editedThread: thread = {
    threadId: 0,
    title: '',
    likes: 0,
    authorId: 0,
    authorNickname: '',
    description: '',
    creationDate: undefined,
    tags: [],
    image: '',
    images: [],
    subthreads: [],
    subscribe: false
  }

  constructor(private fb: FormBuilder,
    private threadService: ThreadService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thread_images: [''],
      thread_tags: ['']
    });

    const userId = this.route.snapshot.paramMap.get('id');
    const numericUserId = Number(userId);

    if (numericUserId) {
      this.threadService.getThread(numericUserId).subscribe({
        next: (data) => {
          this.editedThread = data;

          this.threadForm.setValue({
            title: this.editedThread.title || '',
            description: this.editedThread.description || '',
            thread_images: this.editedThread.images || '',
            thread_tags: this.editedThread.tags || ''
          });
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    }
  }

  onSubmit(): void {
    const id = this.authService.getUserId();

    if (this.threadForm.valid && id && this.editedThread.threadId > 0) {
      const thread: editThread = {
        title: this.threadForm.value.title,
        description: this.threadForm.value.description,
        images: [''],
        tags: this.splitString(this.threadForm.value.thread_tags),
      }

      this.threadService.editThread(this.editedThread.threadId, thread).subscribe({
        next: () => {
          this.snackBarService.openSnackBar('Thread updated!', 'Ok');
        },
        error: (err) => {

          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    }

    if (this.threadForm.valid && id && this.editedThread.threadId < 0) {

      const thread: createThread = {
        title: this.threadForm.value.title,
        description: this.threadForm.value.description,
        images: this.selectedFiles,
        tags: this.splitString(this.threadForm.value.thread_tags),
        userId: id
      }

      this.threadService.add(thread).subscribe({
        next: (response) => {
          this.snackBarService.openSnackBar('Thread added!', 'Ok');
        },
        error: (err) => {

          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  splitString(input: string): string[] {
    if (!input) {
      return [];
    }
    return input.split(',').map(item => item.trim());
  }
}
