import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListThreadsComponent } from "./list-threads/list-threads.component";
import { ThreadComponent } from "./thread/thread.component";
import { ThreadFormComponent } from "./thread-form/thread-form.component";


const routes: Routes = [
  {
    path: 'threads',
    component: ListThreadsComponent
  },
  {
    path: 'thread', // + id dodac
    component: ThreadComponent
  },
  {
    path: 'thread/add',
    component: ThreadFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule { }
