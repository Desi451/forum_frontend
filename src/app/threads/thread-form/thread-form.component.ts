import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { response } from "express";

import { AuthService } from "../../core/auth/auth-service";
import { ThreadService } from "../../core/services/thread-service";
import { createThread, thread } from "../../models/thread";
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
    const userId = this.route.snapshot.paramMap.get('id');
    const numericUserId = Number(userId);

    if (numericUserId) {
      this.threadService.getThread(numericUserId).subscribe({
        next: (data) => {
          this.editedThread = data;

          this.threadForm = this.fb.group({
            title: new FormControl(this.editedThread.title, Validators.required),
            description: new FormControl(this.editedThread.description, Validators.required),
            thread_images: new FormControl(this.editedThread.images),
            thread_tags: new FormControl(this.editedThread.tags),
          });
        },
        error: (err) => {
          this.snackBarService.handleErrors(err.error, 'Ok');
        }
      });
    } else {
      this.threadForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        thread_images: [''],
        thread_tags: [''],
      });
    }
  }


  onSubmit(): void {
    const id = this.authService.getUserId();

    if (this.threadForm.valid && id && this.editedThread.threadId > 0) {
      //TODO update thread
    }

    if (this.threadForm.valid && id) {

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
