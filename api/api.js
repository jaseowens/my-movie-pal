//Requirements:
const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const apiRoutes = express.Router();
const Common = require('../Common');
const MovieDB = require('moviedb')(config.tmdbKey);

//Import user functions
//const userRoutes = require('./users')
//Make use of routes
//apiRoutes.use('/users', userRoutes);

//http://localhost:8080/api/
//Example 1 of authentication required route,
//Pass in our defined middleware of verifyToken, which looks for the token in 
//head, body, or parameters, for validation
apiRoutes.get('/', function(req,res) {
    var movieToSearch = req.query.movie;

    //If verified give message
    MovieDB.searchMovie({ query: movieToSearch }, (err, result) => {
        console.log(result);
        res.json(result);
    });
});

module.exports = apiRoutes;
