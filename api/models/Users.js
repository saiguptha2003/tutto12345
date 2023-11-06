const mongoose=require('mongoose');
const Schema=mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    codechefLink:{
        type:String,
        required:true
    },
    codeforcesLink:{
        type:String,
        required:true
    },
    geeksforgeekslink:{
        type:String,
        required:true
    },
    leetcodeLink:{
        type:String,
        required:true
    },
    hackerrankLink:{
        type:String,
        required:true
    },
    hackerearth:{
        type:String,
        required:true
    }

});
module.exports=mongoose.model('Users',Schema);