const bcrypt = require('bcrypt');

const hashPassword = async (plainText) => {
    // console.log(plainText)
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10; // Default to 10 if not provided
    // console.log(saltRounds)
    const hash= await bcrypt.hash(plainText, saltRounds);
    // console.log(hash);
    return hash;
};

const comparePassword = async (plainText, hashedText) => {
    return await bcrypt.compare(plainText, hashedText);
};

module.exports = { hashPassword, comparePassword };