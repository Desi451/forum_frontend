import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserModule } from './user/user.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { ThreadsModule } from './threads/threads.module';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminModule } from './admin/admin.module';
import { AcceptFormComponent } from './shared/accept-form/accept-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './shared/page-forbidden/page-forbidden.component';
import { HomeComponent } from './shared/home/home.component';
import { PrivacyComponent } from './shared/privacy/privacy.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    AcceptFormComponent,
    PageNotFoundComponent,
    PageForbiddenComponent,
    HomeComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    UserModule,
    ThreadsModule,
    MatPaginatorModule,
    AdminModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
