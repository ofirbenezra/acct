/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    office_phone: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    office_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    user_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
      timestamps: false
  },{
    tableName: 'users'
  });
};
