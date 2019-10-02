import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout';
import { WorkoutDataService } from '../workout-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [WorkoutDataService]
})
export class HomepageComponent implements OnInit {

  workouts: Workout[];
  message: string;
  isLoggedIn: boolean;
  formError: string
  public newWorkout = {
    name: ''
  }

  constructor(private workoutDataService: WorkoutDataService, private auth: AuthenticationService) { }

  private getWorkouts(): void {
    this.workoutDataService
      .getWorkouts()
      .subscribe((foundWorkouts) => {
        this.message = (foundWorkouts.length > 0 ? '' : 'No workouts were found');
        this.workouts = foundWorkouts
      })
  }

  private formIsValid(): boolean {
    if (this.newWorkout.name) {
      console.log('form is valid');
      return true;
    } else {
      console.log('form is invalid');
      return false;
    }
  }

  public onWorkoutSubmit(): void {
    this.formError = '';
    if (this.formIsValid()) {
      this.workoutDataService
        .addWorkout(this.newWorkout)
        .subscribe((workout) => {
          if (workout) {
            console.log('Workout saved', workout);
            this.workouts.unshift(workout);
            this.newWorkout.name = '';
          } else {
            console.log('Workout was no saved');
          }

        });
    } else {
      this.formError = 'You must put in a name for the workout.'
    }
  }

  public onRemoveWorkout(workoutId: string): void {
    this.workoutDataService
      .removeWorkout(workoutId)
      .subscribe((workoutIdRemoved) => {
        console.log('Workout removed', workoutIdRemoved);

        let workout = this.workouts.find(x => x._id === workoutId);
        let index = this.workouts.indexOf(workout);
        this.workouts.splice(index, 1);
        console.log(this.workouts);
      })
  }

  ngOnInit() {
    this.getWorkouts();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.auth.logInChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

}
