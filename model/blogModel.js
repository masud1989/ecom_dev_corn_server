const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        unique: true,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisliked:{
        type:Boolean,
        default:false,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
    ],
    disLikes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    image:{
        type: String,
        default: "https://st2.depositphotos.com/1006899/8421/i/450/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg"
    },
    author: {
        type: String,
        default: "admin"
    },
}, 
{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
}
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);