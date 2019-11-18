const mongoose = require('mongoose')
let mongoUri = process.env.MONGO_URI  

if (process.env.NODE.ENV === 'test') {
    mongoUri = 'mongodb://localhost:27017/click-testing'
} else {
    mongoUri = process.env.MONGO_URI
}

const mongoConfig = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    
}

mongoose.connect(mongoUri, mongoConfig, function(err) {
    if (err) console.log('db disconnected');
    else console.log('db connected');
    
})