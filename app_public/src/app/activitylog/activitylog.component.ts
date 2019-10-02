import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { WorkoutDataService } from '../workout-data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.css'],
  providers: [WorkoutDataService]
})
export class ActivitylogComponent implements OnInit {

  formError: string;
  workoutId: string;
  exerciseId: string;
  exercise: Exercise;
  public message: string;
  public newActivityLog = {
    log: ''
  }

  constructor(private workoutDataService: WorkoutDataService, private route: ActivatedRoute) { }

  private formIsValid(): boolean {
    if(this.newActivityLog.log){
      console.log('form is valid');
      return true;
    } else {
      console.log('form is invalid');
      return false;
    }
  }

  public onActivitySubmit(): void {
    console.log("submit");
    this.formError = '';
    if(this.formIsValid()){
      this.workoutDataService
      .addActivityLog(this.workoutId, this.exerciseId, this.newActivityLog)
      .subscribe((activityLog) => {
        if(activityLog){
          console.log('Activity log saved', activityLog);
          this.exercise.activityLogs.unshift(activityLog);
        } else {
          console.log('unable to save activity log');
        }
      });
    } else {
      this.formError = 'You must put in a log.'
    }
  }

  ngOnInit() {
    this.exercise = new Exercise();

    this.route.paramMap.pipe(switchMap(
      (params: ParamMap) => {
        this.workoutId = params.get('workoutId');
        this.exerciseId = params.get('exerciseId');
        return this.workoutDataService.getExerciseById(this.workoutId, this.exerciseId);
      }
    ))
    .subscribe((foundExercise: Exercise) => {
      this.message = (foundExercise == undefined ? 'No exercise was found' : '');
      this.exercise = foundExercise
      console.log(this.exercise);
    })
  }

}
