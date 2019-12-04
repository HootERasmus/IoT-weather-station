import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Pi } from '../models/pi';
import { User } from 'firebase';
import { AuthenticationService } from '../service/authentication.service';
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-weather-station',
  templateUrl: './weather-station.component.html',
  styleUrls: ['./weather-station.component.css']
})
export class WeatherStationComponent implements OnInit {

  public db: AngularFireDatabase
  public title = 'weather-station';
  public user: User;
  public isLoggedIn: boolean;
  private pies: Array<Pi>;
  private auth: AuthenticationService;
  private tempChart: CanvasJS.Chart;
  private pressureChart: CanvasJS.Chart;
  private humidityChart: CanvasJS.Chart;
  private tempData;
  private pressureData;
  private humidityData;

  constructor(db: AngularFireDatabase, afAuth: AngularFireAuth, auth: AuthenticationService) {
    this.db = db ;
    this.isLoggedIn = auth.isLoggedIn();
    this.pies = new Array<Pi>();
    this.user = auth.getUser();
    this.auth = auth;

    this.tempData = [];
    this.pressureData = [];
    this.humidityData = [];
   }
  
   private subscribe() {
    this.db.list('/' + this.user.uid).valueChanges().subscribe(value => {
      let array = Array<Pi>();
      
      value.forEach(element => {
        array.push(element as Pi);
      });
      
      this.pies = array.sort((a, b) => {
        return <any>new Date(a.date.toString()) - <any>new Date(b.date.toString());
      });

      this.updateChartData();     
    });    
   }

  private cleanChartData() {
    this.tempData = [];
    this.pressureData = [];
    this.humidityData = [];
  }

  private updateChartData() {

    this.cleanChartData();
   
    this.pies.forEach(element => {
      this.tempData.push({label: element.date, y: element.temperature});
      this.pressureData.push({label: element.date, y: element.pressure});
      this.humidityData.push({label: element.date, y: element.humidity});
    })

    this.drawChart(this.tempChart, "temperatureContainer", "Temperature", " C\u00BA",  this.tempData);
    this.drawChart(this.pressureChart, "pressureContainer", "Pressure", " Pa", this.pressureData);
    this.drawChart(this.humidityChart, "humidityContainer", "Humidity", " %", this.humidityData);
  }

  private drawChart(chart: CanvasJS.Chart, id: string, title: string, suffix: string, data: any[]) {
    chart = new CanvasJS.Chart(id, {
      theme: "light2",
      exportEnabled: false,
      animationEnabled: false,
      title:{
        text:title
      },
        axisY: {
        includeZero: false,
        suffix: suffix
      },
        data: [{
        type: "spline",
        dataPoints : data,
      }]
    });

    chart.render(); 
  }

  ngOnInit() {

    this.auth.logInChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = this.auth.isLoggedIn();
      if(isLoggedIn){
        this.user = this.auth.getUser();
        this.db.database.goOnline();     
        this.subscribe();
      } else {
        this.db.database.goOffline();    
        this.pies = new Array<Pi>();
        this.cleanChartData();
        this.updateChartData();
      }
    });

    if(!this.auth.isLoggedIn()){
      this.db.database.goOffline();
    } else {
      this.subscribe();
    }    
  }  
}
