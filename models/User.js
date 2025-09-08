const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
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
    address: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        if(this.password.length < 6){
            throw new Error('Password must be at least 6 characters');
        }
        const salt = bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
    }
    next();
});


module.exports = mongoose.model('User', UserSchema);