const User = require('../models/userModel');
const jwt = require('../services/JWTauth');
const hash = require('../services/hash');

const createUser = async (req, res) => {
    try {
        const { Name, Email, Password, Department, Year, Preferences } = req.body;

        // console.log(Password)
        // Validate required fields
        if (!Name || !Email || !Password || !Department || !Year || !Preferences) {
            return res.status(400).json({ status: 'fail', message: 'All fields are required' });
        }

        // Hash password
        const hashedPassword = await hash.hashPassword(Password);
        console.log(hashedPassword)
        // Create a new user instance
        const newUser = new User({
            Name,
            Email,
            Password: hashedPassword,
            Department,
            Year,
            Preferences
        });
        console.log(newUser)

        // Save the user to the database
        await newUser.save()
            .then(user => {
                console.log("User Saved");
                res.status(200).json({ status: 'success', message: 'User created successfully', user });
            })
            .catch(error => {
                res.status(500).json({ status: 'fail', message: 'Error creating user', error });
            });

    } catch (err) {
        res.status(500).json({ status: 'fail', message: 'Error hashing password', error: err });
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    const { Email, Password } = req.body;

    await User.findOne({ Email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ status: 'fail', message: 'User not found' });
            }

    try {
        // Check if the password matches
        const compare =  hash.comparePassword(Password, user.Password)
        if (!compare) {
                 return res.status(401).json({ status: 'fail', message: 'Invalid password' });
            }

                // Generate a token
                const data = {
                    Name: user.Name,
                    UserId: user._id,
                    Department: user.Department,
                    Role: user.Role
                };
                const token = jwt.generateToken(data); // Pass user data to token generation
                // localStorage.setItem('token', token);

                // Send a response back to the client
                res.status(200).json({ status: 'success', message: 'Login successful', AccessToken: token });

            } catch (err) {
                res.status(500).json({ status: 'fail', message: 'Password comparison failed', error: err.message });
            }

        })
        .catch(error => {
            res.status(500).json({ status: 'fail', message: 'Error logging in', error });
        });
};

module.exports = {
    createUser,
    loginUser,
};
