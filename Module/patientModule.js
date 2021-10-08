module.exports = (connection, Sequelize) => {
    const model = connection.define(
      "patienttbl",
      {
        Id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        Name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        Mobile: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
    //    Password: {
    //         type: Sequelize.STRING,
    //         allowNull: false,
    //       },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
    return model;
  };