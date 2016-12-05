var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var GameLink = mongoose.model('gameLink',{
    gameID: String,
    gameName: String,
    userIp: String,
    userCountry: String,
    clickDate: Date
})

app.use(bodyParser.json())

//add this to enable data communication between front and backend
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

//getting gameLinks
app.get('/api/gameLinks', GetGameLinks)

function GetGameLinks(req, res){
    GameLink.find({}).exec(function(err, result){
        res.send(result)
    })
}

//posting a gameLink
app.post('/api/gameLinks', function(req, res){
    console.log(req.body)
    
    var gameLink = new GameLink(req.body)
    gameLink.save()

    res.status(200)
})


//connecting to mongo
mongoose.connect('mongodb://localhost:27017/test', function(err, db){
    if(!err){
        console.log('connected to mongo')
    }
    else(console.log(err))
})
//starting server
var server = app.listen(7000, function(){
    console.log('express listening on port', server.address().port)
})
