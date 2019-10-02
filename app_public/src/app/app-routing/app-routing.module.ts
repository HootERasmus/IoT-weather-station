import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutpageComponent } from '../workoutpage/workoutpage.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { ActivitylogComponent } from '../activitylog/activitylog.component'
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'workout/:workoutId',
    component: WorkoutpageComponent
  },
  {
    path: 'workout/:workoutId/:exerciseId',
    component: ActivitylogComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
