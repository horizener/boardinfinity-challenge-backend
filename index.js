const express = require('express')
// const path = require('path')
require('./src/db/mongoose')
const User = require('./src/models/newuser')
const multer = require('multer')
const pdfParse = require('pdf-parse')
const fs = require('fs')


var app = express();

//To Parse incoming JSON to an Object 
app.use(express.json())

// To Post New User
app.post('/newuser', (req, res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.send(e)
    })
})

app.get('/verifyuser/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if(!user) {
            res.send('DOCUMENT NOT FOUND').status(404)
        }
        res.send(user)
    })
    .catch((e) => {
        res.status(500).send()
    })
})
// TO check count of digital data
app.get('/count', async (req, res) => {
    const users = await User.find({ctype: 'digital'}).countDocuments()
    try {
        console.log(users)
        res.send(200)         
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

//To check count of data transferred from non digital to digital
app.get('/count/nondigital', async (req, res) => {
    const users = await User.find({ctype: null}).countDocuments()
    try {
        console.log(users)
        res.send(200)         
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

//uploading certificate to route
//defining storage and setting up file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'certificates')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })

const uploadStorage = multer({ storage: storage })

// certificate uploading route and after submitting caste certificate getting data out to store in database
app.post('/upload', uploadStorage.single("file"), (req, res) => {
    const buffer = fs.readFileSync(req.file.path)
    const data = pdfParse(buffer).then((databuffer) => {
        console.log(databuffer)
        res.send(200)
        
    }).catch((error) => {
        console.log(error)
    })
})
    
app.listen(3000, () => {
    console.log('app is up on port 3000')
})