import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MaterialModule } from "../core/material.module";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { BanUserModalComponent } from "./ban-user-modal/ban-user-modal.component";
import { RemoveThreadModalComponent } from "./remove-thread-modal/remove-thread-modal.component";
import { AdminRoutingModule } from "./admin-routing.module";

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
        MatPaginatorModule,
        MatDialogModule,
        MatSlideToggleModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminPanelComponent,
        BanUserModalComponent,
        RemoveThreadModalComponent
    ]
})
export class AdminModule { }
