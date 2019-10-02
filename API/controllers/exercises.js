const mongoose = require("mongoose");
const Work = mongoose.model("workoutPrograms");

const exercisesCreate = function (req, res) {
  const exercise = {
    name: req.body.name,
    description: req.body.description,
    set: req.body.set,
    reps: req.body.reps
  };
  Work.findById(req.params.workoutid)
    .exec((err, workout) => {
      workout.exercises.push(exercise);
      workout.save((err, workout) => {
        let savedExercise
        if(!err && workout){
            savedExercise = workout.exercises.find(
            x => x.name === exercise.name && 
            x.description === exercise.description &&
            x.set === exercise.set &&
            x.reps === exercise.reps);
        }
        
        res.status(200).json(savedExercise);
      });
    });
};

const exercisesDeleteOne = function (req, res) {
  if (req.params.workoutid) {
    Work.findById(req.params.workoutid)
      .exec((err, workout) => {
        workout.exercises.remove(req.params.exerciseid);
        workout.save();
        res.status(204).json(null);
      })
  } else {
    res.status(404).json({
      message: "No workoutid"
    });
  }
};

const exercisesReadOne = function (req, res) {
  let workoutId = req.params.workoutid;
  let exerciseId = req.params.exerciseid;
  if (req.params && workoutId &&exerciseId) {
    Work.findById(workoutId)
    .exec((err, workout) => {
      if (!workout) {
        res.status(404).json({
          message: "workoutid not found"
        });
        return;
      } else if (err) {
        res.status(404).json(err);
        return;
      }
      let exercise = workout.exercises.find(x => x.id === exerciseId)
      
        if(!exercise) {
          res.status(404).json({
            message: "exerciseid not found"
          });
          return;
        }
        res.status(200).json(exercise);
      })   
    
  } else {
    res.status(404).json({
      message: "No workoutid in request"
    });
  }
}

module.exports = {
  exercisesCreate,
  exercisesDeleteOne,
  exercisesReadOne
};
