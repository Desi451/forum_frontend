import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { UserRoutingModule } from "./user-routing.module";

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from "../core/material.module";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  exports: [

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MaterialModule,
    MatIconModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class UserModule { }
