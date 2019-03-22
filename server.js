//Express is used for routing
const express = require('express');
//Instantiate express as app
const app = express();
//Bodyparser middleware to understand parameters
var bodyParser = require('body-parser');
//Morgan is used for dev logging 
const morgan = require('morgan');
//bcrypt for encrypting pass
const bcrypt = require('bcrypt');
//jwt is the authentication solution
var jwt = require('jsonwebtoken');
//Confg file contains db path and jwt secret
var config = require('./config/config');

//Secret for JWT
app.set('superSecret', config);

//Should let use localhost to connect to server, need to look into implications of
//using this live.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//Middleware for body parsing
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Import routes
const apiRoutes = require('./api/api');
//Make use of routes
app.use('/api', apiRoutes);

//Set port
var port = process.env.PORT || 8080;

//Root func, telling that api is up and found at the location provided
//http://localhost:8080/
app.get('/', function(req,res){
    res.send("API up at http://localhost:" + port + "/api");
});

//Signup route, needs to be fully implemented, is hardcoded as of now.
app.post('/signup', function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ where: {username: username} })
    .then(user => {
        //Take the result from that query
        if(!user){
            console.log("No found prev existing user");
            //There is not a user with that name already
            let hash = bcrypt.hashSync(password, 10);

            bcrypt.hash(password, 10).then(function(hash){
                try{
                    let user = User.create(
                        {
                            username: username,
                            password: hash,
                            role: 'REGULAR'
                        }
                    )
                    
                } catch (err){
                    return res.status(400).send(err);
                }
                console.log("made it");
                res.json({
                    //Send JSON back to the requestor with success msg
                    success: true,
                    message: 'User registered'
                });
            });
        } else{
            //There is a user with that name already
            res.json({
                //Send JSON back to the requestor with success msg
                success: false,
                message: 'User exists'
            });
        }
    });
});

//Set the app to listen on port defined above.
app.listen(port);
console.log("Listening on " + port);