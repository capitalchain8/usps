const express = require("express");
const router = express.Router();

let gethome = require("../controller/client").gethome;
let trackResult = require("../controller/client").trackResult;

// Define the routes
router.get('/', gethome);
router.post('/', trackResult);

// Catch-all route for undefined routes (redirect to root)
router.all('*', (req, res) => {
    res.redirect('/');
});

exports.router = router;

