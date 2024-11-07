const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorizeShopkeeper = (req, res, next) => {
    // console.log(req.body)
    const auth_token = req.headers['auth_token'];
    const user_token = req.headers['user_token'];
  
    
    if (!auth_token) {
        console.log('Authorization token missing');
        return res.status(401).send('Authorization token missing');
    }

    if (!user_token) {
        console.log('User token missing');
        return res.status(401).send('User token missing');
    }
    Promise.all([
            new Promise((resolve, reject) => {
                jwt.verify(auth_token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log('Invalid auth token');
                        reject('Invalid auth token');
                    } else {
                        resolve(decoded);
                    }
                });
            }),
            new Promise((resolve, reject) => {
                jwt.verify(user_token, process.env.SHOPKEEPER_TOKEN, (err, decoded) => {
                    if (err) {
                        console.log('Provide valid shopkeeper token');
                        reject('Provide valid shopkeeper token');
                    } else {
                        resolve(decoded);
                    }
                });
            })
        ])
        .then(() => {
            console.log("User is authorized as shopkeeper");
            next();
        })
        .catch((errorMessage) => {
            return res.status(401).send(errorMessage);
        });
};

const authorizeCustomer = (req, res, next) => {
    const auth_token = req.body.auth_token;
    const user_token = req.body.user_token;

    if (!auth_token) {
        console.log('Authorization token missing');
        return res.status(401).send('Authorization token missing');
    }

    if (!user_token) {
        console.log('User token missing');
        return res.status(401).send('User token missing');
    }

    Promise.all([
            new Promise((resolve, reject) => {
                jwt.verify(auth_token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log('Invalid auth token');
                        reject('Invalid auth token');
                    } else {
                        resolve(decoded);
                    }
                });
            }),
            new Promise((resolve, reject) => {
                jwt.verify(user_token, process.env.CUSTOMER_TOKEN, (err, decoded) => {
                    if (err) {
                        console.log('Provide valid customer token');
                        reject('Provide valid customer token');
                    } else {
                        resolve(decoded);
                    }
                });
            })
        ])
        .then(() => {
            console.log("User is authorized as customer");
            next();
        })
        .catch((errorMessage) => {
            return res.status(401).send(errorMessage);
        });
};





module.exports = {
    authorizeCustomer,
    authorizeShopkeeper
};