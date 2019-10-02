const mongoose = require("mongoose");
const Work = mongoose.model("workoutPrograms");

const activityLogCreate = function (req, res) {
    let workoutId = req.params.workoutid;
    let exerciseId = req.params.exerciseid;
    Work.findById(workoutId)
      .exec((err, workout) => {
        let exercise = workout.exercises.find(x => x.id === exerciseId)
        let index = workout.exercises.indexOf(exercise);
        let now = Date.now();
        const activityLog = {
            log: req.body.log,
            time: now
        }

        exercise.activityLogs.unshift(activityLog);
        workout.exercises[index] = exercise;
        workout.update();
        workout.save((err, updatedWorkout) => {
            let savedActivityLog;
            if(err){
                res.status(404).json(err);
                return;
            }
            if(!err && updatedWorkout){
                console.log('New workout', updatedWorkout)
                let updatedExercise = updatedWorkout.exercises.find(x => x.id === exerciseId);
                savedActivityLog = updatedExercise.activityLogs.find(x => x.time.getTime() === now);
            }
            console.log('saving activity log', savedActivityLog);
            res.status(200).json(savedActivityLog);
        });

        
      });
  };
  

module.exports = {
    activityLogCreate
};