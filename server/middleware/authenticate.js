const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkUserAuthentication = (req, res, next) => {



    const auth_token = req.headers['auth_token'];

    if (!auth_token) {
        console.log("Auth token missing");
        return res.status(401).send('Auth token missing');
    }

    jwt.verify(auth_token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Invalid auth token');
            return res.status(401).send('Invalid auth token');
        }
        console.log("User Authenticated")
        
        next();
    });
};

module.exports = {
    checkUserAuthentication
}