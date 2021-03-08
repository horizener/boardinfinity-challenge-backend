const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    caste: {
        type: String,
        required: true
    },
    fathersName: {
        type: String,
        required: true,
        trim: true
    }, 
    age: {
        type: Number,
        required: true,
        
    },
    aadhar: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if(!(/^\d{12}$/.test(value))){
                throw new Error('Invalid AAdhar Number')
            }
        }
    },
    ctype: {
        type: String,
        default: null
    }

    
})

module.exports = User