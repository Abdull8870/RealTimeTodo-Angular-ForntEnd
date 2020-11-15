import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { TodoComponent } from './components/todo/todo.component';
import { AuthGuard } from './services/auth.guard';
import { EditComponent } from './components/edit/edit.component';
import { DeletedComponent } from './components/deleted/deleted.component';
import { CompletedComponent } from './components/completed/completed.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendstodolistComponent } from './components/friendstodolist/friendstodolist.component';
import { FriendstodoEditComponent } from './components/friendstodo-edit/friendstodo-edit.component';
import { FriendstodocompletedComponent } from './components/friendstodocompleted/friendstodocompleted.component';
import { FriendstododeletedComponent } from './components/friendstododeleted/friendstododeleted.component';
import { FriendstodoeditComponent } from './components/friendstodoedit/friendstodoedit.component';
import { HomeComponent } from './components/home/home.component';
import { AfterAuthGuard } from './services/afterauth.guard';



const appRoutes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'home', component: HomeComponent},
   { path: 'login', component: LoginComponent,canActivate: [AfterAuthGuard]},
   { path: 'signup', component: SignupComponent,canActivate: [AfterAuthGuard] },
   { path: 'reset', component: ResetComponent,canActivate: [AfterAuthGuard] },
   { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]  },
   { path: 'friends', component: FriendsComponent,canActivate: [AuthGuard]  },
   { path: 'todo', component: TodoComponent,canActivate: [AuthGuard]  },
   { path: 'completed', component: CompletedComponent,canActivate: [AuthGuard]  },
   { path: 'deleted', component: DeletedComponent,canActivate: [AuthGuard]  },
   { path: 'edit/:id', component: EditComponent,canActivate: [AuthGuard]  },
   { path: 'Ftodo/:id', component: FriendstodolistComponent,canActivate: [AuthGuard]  },
   { path: 'Fedit/:id', component: FriendstodoEditComponent,canActivate: [AuthGuard]  },
   { path: 'Fcompleted/:id', component: FriendstodocompletedComponent,canActivate: [AuthGuard]  },
   { path: 'Fdeleted/:id', component: FriendstododeletedComponent,canActivate: [AuthGuard]  },
   { path: 'not-found', component: FriendstodoeditComponent },
   { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
