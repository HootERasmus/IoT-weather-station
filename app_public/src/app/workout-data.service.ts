import { Injectable } from '@angular/core';
import { Workout } from './models/workout';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Exercise } from './models/exercise';

@Injectable({
  providedIn: 'root'
})
export class WorkoutDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'https://workoutmegacorp.herokuapp.com/api/';

  public getWorkouts(): Observable<Workout[]> {
    const url: string = `${this.apiBaseUrl}workout`;
    return this.http.get<Workout[]>(url);
  }

  public getWorkoutById(workoutId: string): Observable<Workout>{
    const url: string = `${this.apiBaseUrl}workout/${workoutId}`;
    return this.http.get<Workout>(url);
  }

  public addWorkout(formData: any): Observable<any> {
    const url: string = `${this.apiBaseUrl}workout`;
    console.log(formData)
    return this.http.post(url, formData);
  }

  public removeWorkout(workoutId: string): Observable<any> {
    const url: string = `${this.apiBaseUrl}workout/${workoutId}`;
    console.log('Workout to remove', workoutId);
    return this.http.delete(url);
  }

  public addExercise(workoutId: string, formData:any): Observable<any> {
    const url: string = `${this.apiBaseUrl}workout/${workoutId}/exercises`;
    console.log(formData);
    return this.http.post(url, formData);
  }

  public removeExercise(workoutId: string, exerciseId: string): Observable<any> {
    const url: string = `${this.apiBaseUrl}workout/${workoutId}/exercises/${exerciseId}`;
    console.log('Exercise to remove', exerciseId)
    return this.http.delete(url);
  }

  public getExerciseById(workoutId: string, exerciseId: string): Observable<Exercise> {
    const url: string = `${this.apiBaseUrl}workout/${workoutId}/exercises/${exerciseId}`;
    return this.http.get<Exercise>(url);
  }

  public addActivityLog(workoutId: string, exerciseId: string, formData:any): Observable<any> {
    const url: string = `${this.apiBaseUrl}workout/${workoutId}/exercises/${exerciseId}/activityLog`;
    console.log(formData);
    return this.http.post(url, formData);
  }
}
