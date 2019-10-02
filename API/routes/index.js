const express = require("express");
const router = express.Router();
const ctrlWorkout = require("../controllers/workouts");
const ctrlExercises = require("../controllers/exercises");
const ctrlActivityLog = require("../controllers/activityLog");
const ctrlAuth = require('../controllers/authentication');
const jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// workout
router.get("/workout", ctrlWorkout.workoutGetAll)
router.post("/workout", auth, ctrlWorkout.workoutCreate);

router.get("/workout/:workoutid", ctrlWorkout.workoutReadOne)
router.delete("/workout/:workoutid", auth, ctrlWorkout.workoutDeleteOne)
  
// exercises
router.post("/workout/:workoutid/exercises", auth, ctrlExercises.exercisesCreate);

router.get("/workout/:workoutid/exercises/:exerciseid", ctrlExercises.exercisesReadOne);
router.delete("/workout/:workoutid/exercises/:exerciseid", auth, ctrlExercises.exercisesDeleteOne);

// activityLog
router.post("/workout/:workoutid/exercises/:exerciseid/activitylog", auth, ctrlActivityLog.activityLogCreate);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
