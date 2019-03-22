const jwt = require('jsonwebtoken');
const config = require('./config/config');
const User = require('./models/users');


//Below is our own middleware that is used to check and make sure a user is who they say they are. 
function verifyToken(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        jwt.verify(token, config.secret, function(err, decoded){
            if(err){
                return res.json({success:false, message:'Failed authenticate'});
            }
            req.decoded = decoded;
            next();
        });
    } else{
        return res.status(403).send({
            success:false,
            message: 'No token'
        });
    }
};

module.exports = {
    verifyToken
}