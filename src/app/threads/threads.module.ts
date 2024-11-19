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

@NgModule({
  exports: [

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MaterialModule,
    MatIconModule,
    ThreadRoutingModule
  ],
  declarations: [
    ThreadComponent,
    ListThreadsComponent,
    ThreadFormComponent
  ]
})
export class ThreadsModule { }
