var express = require('express');
const patient = require("../Controller/patientController");
const { body, validationResult } = require("express-validator");
var router = express.Router();
/* GET home page. */
router.get("/", patient.findAll);
 router.get("/:id", patient.findone);

router.post('/create',
    [body("Name").notEmpty().isLength({ min: 2, max: 70 }),
    body("Address"),
    body("Mobile").isLength({ min: 10, max: 12 })],
  //  body("Password").not().isEmpty().withMessage("Password required")],
    patient.create);

router.post("/update/:id", patient.update);

router.post("/delete/:id", patient.delete);

    
module.exports = router;

