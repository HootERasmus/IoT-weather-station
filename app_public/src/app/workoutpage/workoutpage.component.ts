import { Component, OnInit } from '@angular/core';
import { WorkoutDataService } from '../workout-data.service' ;
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Workout } from '../models/workout';
import { Exercise } from '../models/exercise';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-workoutpage',
  templateUrl: './workoutpage.component.html',
  styleUrls: ['./workoutpage.component.css'],
  providers: [WorkoutDataService]
})

export class WorkoutpageComponent implements OnInit {

  public formError: string;
  public addExercise: Exercise;
  public workout: Workout;
  public message: string;
  public isLoggedIn: boolean;
  
  constructor(private workoutDataService: WorkoutDataService, private route: ActivatedRoute, private auth: AuthenticationService) { }

  private formIsValid(): boolean{
    if(this.addExercise.name && this.addExercise.description && this.addExercise.reps && this.addExercise.set){
      console.log('form is valid');
      return true;
    } else {
      console.log('form is invalid');
      return false;
    }
  }

  public onExerciseSubmit(): void{
    console.log('save exercise')
    this.formError = '';
    if(this.formIsValid()){
      this.workoutDataService
      .addExercise(this.workout._id, this.addExercise)
      .subscribe((exercise) => {
        if(exercise) {
          console.log('Exercise saved', exercise);
          this.addExercise = new Exercise();
          this.workout.exercises.unshift(exercise);
        } else {
          console.log('Exercise was not saved');
        }        
      })
    }
  }

  public onRemoveExercise(exerciseId: string): void{
    console.log('Remove exercise', exerciseId);
    this.workoutDataService
    .removeExercise(this.workout._id, exerciseId)
    .subscribe((exerciseIdRemoved) => {
      console.log('Exercise removed', exerciseIdRemoved);

      let exercise = this.workout.exercises.find(x => x._id === exerciseId);
      let index = this.workout.exercises.indexOf(exercise);
      this.workout.exercises.splice(index, 1);
      console.log(this.workout.exercises);

    })
  }

  ngOnInit() {
    this.workout = new Workout();
    this.addExercise = new Exercise();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.auth.logInChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      
    });

    this.route.paramMap.pipe(switchMap(
      (params: ParamMap) => {
        let id = params.get('workoutId');
        return this.workoutDataService.getWorkoutById(id);
      }
    ))
    .subscribe((foundWorkout: Workout) => {
      this.message = (foundWorkout == undefined ? 'No workout was found' : '');
      this.workout = foundWorkout
      console.log(this.workout);
    })
  }

}
