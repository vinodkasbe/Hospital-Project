let jwt = require("jsonwebtoken");
let checkToken = (req, res, next) => {
  const token = req.headers.token;
  const id= req.body.id;
  if (token) {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid",
        });
      } else {
        req.user = decoded;
        console.log(decoded.id);
        // if(decoded.StudID!=studid)
        // { return res.status(401).json({
        //   message: "Unauthorized attempt!",
        // });
        // }else{
          next();
        // }
      }
    });
  } else {
    return res.status(401).json({
      error: true,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = {
  checkToken:checkToken
};
