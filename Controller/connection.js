
const Sequelize = require("sequelize");
let connection = new Sequelize({
  dialect: "mysql",
  database: "hospital",
  username: "root",
  host: "localhost",
  port: "3306",
  password: "",
//   logging: true,
// operatorsAliases: false,
//   pool: {
//       "max": 100,
//       "min": 1,
//       "idle": 200000,
//       "acquire": 200000
//   },

//   retry: { "max": 3 },
});

connection
  .authenticate()
  .then(() => {
    console.log("Mysql Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = connection;
  
  db.patienttbl=require('../Module/patientModule')(connection,Sequelize);
  db.doctortbl=require('../Module/doctorModule')(connection,Sequelize);
  db.stafftbl=require('../Module/hospitalStaffModule')(connection,Sequelize);
  db.admintbl=require('../Module/adminModule')(connection,Sequelize);
  //db.fcttbl=require('../model/faculty.model')(connection,Sequelize);
  module.exports=db;
