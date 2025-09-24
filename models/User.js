const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        required: true,
        select: false
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

UserSchema.pre('save', async function (next) {
    try{
        if (this.isModified('password') || this.isNew) {
            if(this.password.length < 6){
                throw new Error('Password must be at least 6 characters');
            }
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('User', UserSchema);