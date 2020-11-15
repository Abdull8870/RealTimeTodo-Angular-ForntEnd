import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from "./services/auth-interceptor";
import { HttpClientModule ,HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { TodoComponent } from './components/todo/todo.component';
import { AuthGuard } from './services/auth.guard';
import { EditComponent } from './components/edit/edit.component';
import { DeletedComponent } from './components/deleted/deleted.component';
import { CompletedComponent } from './components/completed/completed.component';
import { FriendsComponent } from './components/friends/friends.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FriendstodolistComponent } from './components/friendstodolist/friendstodolist.component';
import { FriendstodoEditComponent } from './components/friendstodo-edit/friendstodo-edit.component';
import { FriendstodoeditComponent } from './components/friendstodoedit/friendstodoedit.component';
import { FriendstodocompletedComponent } from './components/friendstodocompleted/friendstodocompleted.component';
import { FriendstododeletedComponent } from './components/friendstododeleted/friendstododeleted.component';
import { HomeComponent } from './components/home/home.component';
import { AfterAuthGuard } from './services/afterauth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetComponent,
    HeaderComponent,
    ProfileComponent,
    TodoComponent,
    EditComponent,
    DeletedComponent,
    CompletedComponent,
    FriendsComponent,
    SidebarComponent,
    FriendstodolistComponent,
    FriendstodoEditComponent,
    FriendstodoeditComponent,
    FriendstodocompletedComponent,
    FriendstododeletedComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right',
        preventDuplicates: true
      }
    )
  ],
  providers: [AuthGuard,AfterAuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
