import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
            type: String,
            required: true
    },
    isAdmin: {
        type: Number,
        default: 0,
    },
}, {Timestamp:true});

export default mongoose.model('users', userSchema)