var express = require('express');
const admin = require("../Controller/adminController");
const { body, validationResult } = require("express-validator");
var router = express.Router();
/* GET home page. */
router.get("/", admin.findAll);
 router.get("/:id", admin.findone);

router.post('/create',
    [body("Username").notEmpty().isLength({ min: 2, max: 70 }),
    body("Password").not().isEmpty().withMessage("Password required")],
    admin.create);

router.post("/update/:id", admin.update);

router.post("/delete/:id", admin.delete);

    
module.exports = router;

