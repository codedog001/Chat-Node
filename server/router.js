const express = require('express');
const router = express.Router();

//TO check if our server is actually up and running at port 5000
router.get('/', (req, res) => {
    res.send('Server is up and running');
});

module.exports = router;