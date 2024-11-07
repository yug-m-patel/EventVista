const jwt=require('jsonwebtoken')
require("dotenv").config()

const generateToken = (data) => {
    return jwt.sign({
        data
    }, process.env.JWT_SECRET, {
        expiresIn: '5h'
    });
};

// const generateShopkeeperToken=(role)=>{
//     return jwt.sign({
//         role:role
//     },process.env.SHOPKEEPER_TOKEN,{
//         expiresIn:'5h'
//     })
// }

// const generateCustomerToken=(role)=>{
//     return jwt.sign({
//         role:role
//     },process.env.CUSTOMER_TOKEN,{
//         expiresIn:'5h'
//     })
// }

module.exports={generateToken};