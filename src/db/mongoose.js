const mongoose = require('mongoose')
// const validate = require('validate')

mongoose.connect('mongodb://127.0.0.1:27017/certificates', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})

