module.exports = (connection, Sequelize) => {
    const model = connection.define(
      "admintbl",
      {
        Id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        Username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        
       Password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
    return model;
  };