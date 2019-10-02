const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    set:{
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    reps:{
        type: String,
        default: "11",
        required: true
    }
});

const workoutProgramSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },     
    exercises:[exerciseSchema]
});

mongoose.model('workoutPrograms', workoutProgramSchema, 'workoutPrograms');