const express = require('express');

const router = express.Router();
const userRoutes = require("./userRoutes")
const adminRoutes = require("./adminRoutes")
const eventRoutes = require("./eventRoutes")


// Example route
router.use('/user', userRoutes);

// router.use('/admin', adminRoutes);

router.use("/event", eventRoutes)
// router.use('/user',userRoutes)

module.exports = router;