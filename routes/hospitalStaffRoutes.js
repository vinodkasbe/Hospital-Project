var express = require('express');
const staff = require("../Controller/hospitalStaffController");
const { body, validationResult } = require("express-validator");
var router = express.Router();
/* GET home page. */
router.get("/", staff.findAll);
 router.get("/:id", staff.findone);

router.post('/create',
    [body("staffName").notEmpty().isLength({ min: 2, max: 70 }),
    body("Address"),
    body("staffDept"),
    body("Mobile").isLength({ min: 10, max: 12 })],
  //  body("Password").not().isEmpty().withMessage("Password required")],
    staff.create);

router.post("/update/:id", staff.update);

router.post("/delete/:id", staff.delete);

    
module.exports = router;

