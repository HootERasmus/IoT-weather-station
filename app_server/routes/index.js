var express = require('express');
var router = express.Router();
const ctrlWorkouts = require('../controllers/workouts');

/* GET home page. */
router.get('/', ctrlWorkouts.home);
router.post('/workout/add', ctrlWorkouts.addWorkout); // put
router.get('/workout/edit', ctrlWorkouts.editWorkout);
router.post('/workout/remove', ctrlWorkouts.removeWorkout); // delete

router.post('/workout/exercise/add', ctrlWorkouts.addExercise);
router.post('/workout/exercise/remove', ctrlWorkouts.removeExercise); // delete
module.exports = router;