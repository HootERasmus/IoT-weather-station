import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { WeatherStationComponent } from '../weather-station/weather-station.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent
   },
   {
     path: '',
     component: WeatherStationComponent
   }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
