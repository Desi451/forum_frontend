import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MaterialModule } from "../core/material.module";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { MatTabsModule } from '@angular/material/tabs';
import { BannedUsersComponent } from "./banned-users/banned-users.component";
import { ReportedUsersComponent } from "./reported-users/reported-users.component";
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from "@angular/material/tooltip";
import { DislikedThreadsComponent } from './disliked-threads/disliked-threads.component';
import { BanModalComponent } from './ban-modal/ban-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    AdminRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  declarations: [
    AdminPanelComponent,
    BannedUsersComponent,
    ReportedUsersComponent,
    DislikedThreadsComponent,
    BanModalComponent,
  ],
  providers: [{ provide: MatPaginatorIntl }],
})
export class AdminModule { }
