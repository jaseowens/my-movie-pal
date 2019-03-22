//Requirements:
const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/config')
const apiRoutes = express.Router();
const Common = require('../Common');

//Import user functions
//const userRoutes = require('./users')
//Make use of routes
//apiRoutes.use('/users', userRoutes);

//http://localhost:8080/api/
//Example 1 of authentication required route,
//Pass in our defined middleware of verifyToken, which looks for the token in 
//head, body, or parameters, for validation
apiRoutes.get('/', Common.verifyToken, function(req,res) {
    //If verified give message
    console.log(req.body);
    console.log(req.query);
    res.json({message: 'API up and running, and you are authenticated'});
});

module.exports = apiRoutes;
