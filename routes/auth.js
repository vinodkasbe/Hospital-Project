var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const connection=require('../controller/mysqlConnection');

/* GET home page. */
router.post('/login', (req, res, next)=> {
  let Username=req.body.Username;
  let Password=req.body.Password;
  console.log(req.body);
  connection.query(`select * from admintbl where Username='${Username}'`,async(err,result)=> {
      if(err) {
       console.log(err)
      }else{
         const isSame = await bcrypt.compare(Password, result[0].Password); 
         console.log(isSame);
    // if(password==result[0].password){
        if(isSame){
          const token= jwt.sign({
                 id:result[0].id,
                 Username: result[0].Username,
              }, 'secretkey', { expiresIn: 60 * 60 });
          res.send({
              error:false,
              token:token,
              message:"login Successfully"
          })    
        }else{
            res.send({
                error:true,
                message:"invalid details"
            }) 
        }
        
      }
  })
});

module.exports=router;