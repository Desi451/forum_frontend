import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MaterialModule } from "../core/material.module";
import { MatIconModule } from "@angular/material/icon";
import { ThreadComponent } from "./thread/thread.component";
import { ListThreadsComponent } from "./list-threads/list-threads.component";
import { ThreadFormComponent } from './thread-form/thread-form.component';
import { ThreadRoutingModule } from "./threads-routing.module";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CommentFormComponent } from "../shared/comment-form/comment-form.component";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  exports: [

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MaterialModule,
    MatIconModule,
    ThreadRoutingModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  declarations: [
    ThreadComponent,
    ListThreadsComponent,
    ThreadFormComponent,
    CommentFormComponent,
  ]
})
export class ThreadsModule { }
