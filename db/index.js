var settings = require('../settings.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(settings.dbUrl);
mongoose.model('User',new mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    avatar:{type:String,require:true},
}));
mongoose.model('Article',new mongoose.Schema({
    title:{type:String,require:'true'},
    content:{type:String,require:'true'},
    createAt:{type:Date,default:Date.now},
    user:{type:ObjectId,ref:'User'}
}));
global.Model=function(type){
    return mongoose.model(type);
}