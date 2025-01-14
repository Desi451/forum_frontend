import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { UserRoutingModule } from "./user-routing.module";

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from "../core/material.module";
import { MatIconModule } from "@angular/material/icon";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserThreadsComponent } from './user-threads/user-threads.component';
import { UserSubscribedThreadsComponent } from './user-subscribed-threads/user-subscribed-threads.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ReasonFormComponent } from "../shared/reason-form/reason-form.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  exports: [

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MaterialModule,
    MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    EditProfileComponent,
    UserProfileComponent,
    UserThreadsComponent,
    UserSubscribedThreadsComponent,
    ReasonFormComponent
  ]
})
export class UserModule { }
