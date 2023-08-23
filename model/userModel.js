const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
   lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type:String,
        default: "user", 
    },
    isBlocked: {
        type:Boolean,
        default: false, 
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String
    },
    wishList: [{type: mongoose.Schema.Types.ObjectId , ref: "Product"}],
    refreshToken: {
        type: String
    }
}, 
{timestamps: true}
);

//Password Hash
userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
});

//Password Check
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

//Export the model
module.exports = mongoose.model('users', userSchema);