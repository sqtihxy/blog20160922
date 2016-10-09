var settings = require('../settings.js');
var mongoose = require('mongoose');
mongoose.connect(settings.dbUrl);
mongoose.model('User',new mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    avatar:{type:String,require:true},
}));
global.Model=function(type){
    return mongoose.model(type);
}