/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('office_types', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'office_types'
  });
};
