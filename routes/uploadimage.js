var express = require('express');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +'.jpg')
    }
  })
  
const upload = multer({ storage: storage })
let router=express.Router();
// let checkToken=require('../middelware/checktoken.middelware');
//let studentController=require('../controllers/student.controllers');

//router.get('/',studentController.getAllStudents)

//router.post('/create',studentController.createNewStudent) 
router.post('/imageupload',upload.single('avatar'),(req,res,next) => {

    console.log(req.file, req.body);
    res.send(req.file.filename);
})
module.exports=router;


