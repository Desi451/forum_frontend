import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";


const routes: Routes = [
    {
        path: 'panel',
        component: AdminPanelComponent
    },
    //   {
    //     path: 'thread/:id',
    //     component: ThreadComponent
    //   },
    //   {
    //     path: 'thread/new/add',
    //     component: ThreadFormComponent
    //   }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }