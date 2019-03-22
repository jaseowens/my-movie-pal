//User model definition
//Requirements:
const Sequelize = require('sequelize');
const config = require('../config/config');
const bcrypt = require('bcrypt');

//Instantiate sequelize, and connect to db
//{dbname, user, password}
var sequelize = new Sequelize(config.db_name,config.db_user,config.db_password,{
    //sequelize can be used with many db languages, for this project, psql
    dialect: 'postgres',
    //host of the db
    host: config.db_host
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Successfully connected to User table");
    })
    .catch(() =>{
        console.log("Something went wrong connecting to User table");
    });

//Define user
var User = sequelize.define('user', {
    userid:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    //Username column
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //password column
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profileImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    //admin boolean column
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
// Table created
    bcrypt.hash('d', 10).then(function(hash){
        try{
            User.create(
                {
                    username: 'd',
                    password: hash,
                    role: 'DEVELOPER'
                }
            )
            console.log("Developer User created")
        } catch (err){
            console.log("something went wrong making developer user");
        }
    });
    bcrypt.hash('a', 10).then(function(hash){
        try{
            let dev = User.create(
                {
                    username: 'a',
                    password: hash,
                    role: 'ADMIN'
                }
            )
            console.log("Admin User created")
        } catch (err){
            console.log("something went wrong making admin user");
        }
    });
    bcrypt.hash('r', 10).then(function(hash){
        try{
            let dev = User.create(
                {
                    username: 'r',
                    password: hash,
                    role: 'REGULAR'
                }
            )
            console.log("Regular User created")
        } catch (err){
            console.log("something went wrong making regular user");
        }
    });
console.log("Created user table and users");
});

module.exports = User;