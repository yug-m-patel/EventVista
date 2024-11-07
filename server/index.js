const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors")
const bodyParser = require("body-parser")
const routes = require("./routes/mainRoot");
const { upload } = require('./middleware/multer');
const { uploadFile } = require('./services/cloudinary');
const User = require('./models/userModel');

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use("/api", routes)
// create a route in route folder
// use route as middleware
dotenv.config();
const port = 3000;

app.post('/upload', upload.single('image'), async (req, res) => {
    const localFilePath = req.file.path;
    const result = await uploadFile(localFilePath);

    console.log(result);
    if (result) {
        res.status(200).json({resultU: result });
    } else {
        res.status(500).json({ error: "Failed to upload image" });
    }
});

app.get('/profile/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: 'Error fetching profile data', error: err });
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})