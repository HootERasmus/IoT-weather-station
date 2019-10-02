const mongoose = require('mongoose');
const Work = mongoose.model('workoutPrograms');

const handleError = function(error, res){
    if(error)
        res.render('error');
};

const home = function(req, res) {
    Work
        .find()
        .exec((err, workouts) => {
            handleError(err);

            res.render("index", {
                workouts: workouts
            });
        });
}

const addWorkout = function(req, res) {
    Work.create({
        name: req.body.name,
        exercises: []
        }, (err) => {
            handleError(err);
            res.redirect(303, '/')
    })
}

const removeWorkout = function(req, res) {
    Work.findByIdAndRemove(req.body.id,
        () => {
        res.redirect(303, '/');
    });
}

const editWorkout = function(req, res) {
    Work
        .findById(req.query.id)
        .exec((err, workout) => {
            handleError(err);

            res.render('workout', {
                workout: workout
            });
        });
}

const addExercise = function(req, res) {
    let exercise = {
        name: req.body.name,
        description: req.body.description,
        set: req.body.set,
        reps: req.body.reps
    }
    Work.findByIdAndUpdate(req.body.id, { 
        $push: { exercises: exercise }}, 
        {new: true}, () => {
            Work
            .findById(req.body.id)
            .exec((err) => {
                handleError(err);
                
                res.redirect(303, `/workout/edit?id=${req.body.id}`)           
            }); 
        }
    );
}

const removeExercise = function(req, res) {
    Work
        .findById(req.body.workoutId)
        .exec((err, workout ) => {
            handleError(err);

            let exercises = workout.exercises
            let exercise = exercises.find(x => x.id === `${req.body.exerciseId}`)
            let index = exercises.indexOf(exercise);
            exercises.splice(index, 1);

            Work.findByIdAndUpdate(req.body.workoutId, {
                $set: {exercises: exercises}}
                ,(err) => {
                    handleError(err);
                    
                    res.redirect(303, `/workout/edit?id=${req.body.workoutId}`)
                })
        } )

}

module.exports = {
    home,
    addWorkout,
    removeWorkout,
    editWorkout,
    addExercise,
    removeExercise
}