const mongoose = require('mongoose');

const activityLogShcema = new mongoose.Schema({
    time: {
        type: Date,
        required: true
    },
    log: {
        type: String,
        required: true
    }
},{
    usePushEach: true
})

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
    },
    activityLogs: [activityLogShcema]
},{
    usePushEach: true
});

const workoutProgramSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    count:{
        type: Number,
        default: 0,
        min: 0,
        required: true
    },
    exercises:[exerciseSchema]
},{
    usePushEach: true
}
);

mongoose.model('workoutPrograms', workoutProgramSchema, 'workoutPrograms');