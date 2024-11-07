const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_PATH).then(() => {
    console.log("Database connected successfully")
}).catch((err) => {
    console.log("Database connection failed")
    console.log(err)
});
module.exports = mongoose;