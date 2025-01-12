import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'edit/:id',
    component: EditProfileComponent
  },
  {
    path: ':id',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
