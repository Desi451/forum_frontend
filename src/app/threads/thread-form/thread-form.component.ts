import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrl: './thread-form.component.scss'
})
export class ThreadFormComponent implements OnInit {
  threadForm!: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {}

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
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      console.log('Selected files:', this.selectedFiles);
    }
  }
}
