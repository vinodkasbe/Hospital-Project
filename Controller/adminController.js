const db=require('./connection');
const admintbl = db.admintbl;
const sequelize=db.sequelize;
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, errors: errors.array() });
    }
    else {
       const salt = await bcrypt.genSalt(10);
       const hash = await bcrypt.hash(req.body.Password, salt);
       // use for login api with password check
       const checkpassword = await bcrypt.compare(req.body.Password, hash);

        console.log(hash);
        const admin = {
            Username: req.body.Username, 
            Password: hash
        }

        admintbl.create(admin).then((data) => {
            res.status(200).send({ error: false, message: "Record Inserted successfully." });
        }).catch((err) => {
            res.status(200).send({
                error: true,
                message:
                    err.message,
            });
        });
    }
}

// Update a Record by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    admintbl.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Record updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update record with id=${id}. Maybe User was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating User with id=" + id,
        });
      });
  };

exports.findAll = async (req, res) => {

    //const data = await db.sequelize.query("select * from emptbl", { replacements: [false], type: sequelize.QueryTypes.SELECT })
    // res.send(data);
      admintbl.findAll({}).then(function (data) {
          res.send({error: false,message: "success", data: data });
      })
      .catch((err) => {
        res.status(200).send({
          error:true,
          message:
            err.message || "Some error occurred while retrieving User details.",
        });
      });
}

exports.findone = (req, res) => {
    const id = req.params.id;
let qry={
    where: {id:id}
}

    // db.sequelize
    //     .query(
    //         "select * from emptbl where id=?",
    //         { replacements: [id], type: sequelize.QueryTypes.SELECT }
    //     ) 
    admintbl.findAll(qry)   
    .then(function (data) {
            res.send({ error: false, message: "success", data: data });
        })
        .catch((err) => {
            res.status(200).send({
                error: true,
                message:
                    err.message || "Some error occurred while retrieving User details.",
            });
        });
};


// /////////////////////////////////////////
// exports.findAll = (req, res) => {
//     const title = req.params.title;
//     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
//     User.findAll({ where: condition })
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials.",
//         });
//       });
//   };
  
//   // Find a single User with an id
//   exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     patienttbl.findByPk(id)
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: "Error retrieving User with id=" + id,
//         });
//       });
//   };
  
   
  // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    patienttbl.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Record deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete record with id=${id}. Maybe User was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete record with id=" + id,
        });
      });
  };

//   // Delete all Users from the database.
//   exports.deleteAll = (req, res) => {
//     User.destroy({
//       where: {},
//       truncate: false,
//     })
//       .then((nums) => {
//         res.send({ message: `${nums} Users were deleted successfully!` });
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all tutorials.",
//         });
//       });
//   };
  
//   // Find all active Users
//   exports.findAllActive = (req, res) => {
//     User.findAll({ where: { isActive: true } })
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials.",
//         });
//       });
//   };
