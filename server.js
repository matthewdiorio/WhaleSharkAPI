if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(__dirname + '/client/js'));

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(err))
db.once('open', (error) => console.log('Connected to Database'))

app.use(express.json())

const factsRouter = require('./routes/facts')
app.use('/whalesharkfacts', factsRouter)

app.listen(process.env.PORT || 3000, () => console.log('Server has started'))


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });