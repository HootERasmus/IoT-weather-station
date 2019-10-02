const mongoose = require("mongoose");
const Work = mongoose.model("workoutPrograms");

const workoutCreate = function(req, res) {
  let workout = {
    name: req.body.name,
  }
  Work.create(
    workout,
    (err, workouts) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(workouts);
      }
    }
  );
};

const workoutReadOne = function(req, res) {
  if (req.params && req.params.workoutid) {
    Work.findById(req.params.workoutid)
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
      res.status(200).json(workout);
    });
  } else {
    res.status(404).json({
      message: "No workoutid in request"
    });
  }
};

const workoutGetAll = function(req, res) {
  Work.find().exec((err, workouts) => {
    res.status(200).json(workouts);
  });
};

const workoutDeleteOne = function(req, res) {
  let workoutId = req.params.workoutid;
  if (req.params.workoutid) {
    Work.findByIdAndRemove(workoutId).exec((err, workout) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(204).json(workoutId);
    });
  } else {
    res.status(404).json({
      message: "No workoutid"
    });
  }
};

module.exports = {
  workoutGetAll, 
  workoutCreate,
  workoutReadOne,
  workoutDeleteOne
};
