import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListThreadsComponent } from "./list-threads/list-threads.component";
import { ThreadComponent } from "./thread/thread.component";
import { ThreadFormComponent } from "./thread-form/thread-form.component";


const routes: Routes = [
  {
    path: '',
    component: ListThreadsComponent
  },
  {
    path: ':id',
    component: ThreadComponent
  },
  {
    path: 'thread/add',
    component: ThreadFormComponent
  },
  {
    path: 'edit/:id',
    component: ThreadFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule { }
