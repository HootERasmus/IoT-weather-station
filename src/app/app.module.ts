import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { WeatherStationComponent } from './weather-station/weather-station.component';
import { FrameworkComponent } from './framework/framework.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WeatherStationComponent,
    FrameworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'weather-station')
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
