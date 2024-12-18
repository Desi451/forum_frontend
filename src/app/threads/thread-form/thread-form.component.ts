import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { response } from "express";

import { AuthService } from "../../core/auth/auth-service";
import { ThreadService } from "../../core/services/thread-service";
import { createThread } from "../../models/thread";

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrl: './thread-form.component.scss'
})
export class ThreadFormComponent implements OnInit {
  threadForm!: FormGroup;
  selectedFiles: File[] = [];
  currentUser: any;

  constructor(private fb: FormBuilder,
    private threadService: ThreadService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thread_images: [''],
      thread_tags: [''],
    });
  }

  onSubmit(): void {
    if (this.threadForm.valid) {
      console.log('Form data:', this.threadForm.value);
      const thread: createThread = {
        title: this.threadForm.value.title,
        description: this.threadForm.value.description,
        images: this.selectedFiles,
        tags: this.splitString(this.threadForm.value.thread_tags),
        userId: this.currentUser.UserID
      }

      this.threadService.add(thread).subscribe({
        next: (response) => {
          console.log('thread added');
        },
        error: (err) => {
          console.error('error while adding thread', err);
        }
      });

    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      console.log('Selected files:', this.selectedFiles);
    }
  }

  splitString(input: string): string[] {
    if (!input) {
      return [];
    }
    return input.split(',').map(item => item.trim());
  }
}
