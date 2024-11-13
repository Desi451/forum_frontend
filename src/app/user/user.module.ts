import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  exports: [

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class UserModule { }
