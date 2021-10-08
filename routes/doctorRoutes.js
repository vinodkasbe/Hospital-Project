var express = require('express');
const doctor = require("../Controller/doctorController");
const { body, validationResult } = require("express-validator");
var router = express.Router();
/* GET home page. */
router.get("/", doctor.findAll);
 router.get("/:id", doctor.findone);

router.post('/create',
    [body("docName").notEmpty().isLength({ min: 2, max: 70 }),
    body("Address"),
    body("Mobile").isLength({ min: 10, max: 12 })],
  //  body("Password").not().isEmpty().withMessage("Password required")],
    doctor.create);

router.post("/update/:id", doctor.update);

router.post("/delete/:id", doctor.delete);

    
module.exports = router;

