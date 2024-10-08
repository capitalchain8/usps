const express = require("express")
const router = express.Router()

let gethome = require("../controller/client").gethome
let track = require("../controller/client").track
let trackResult = require("../controller/client").trackResult
let services = require("../controller/client").services

router.get('/', gethome)
router.get('/track',track)
router.post('/track',trackResult)
router.get('/services',services)





exports.router = router