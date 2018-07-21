/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('licenses', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    office_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'office_details',
        key: 'office_id'
      }
    },
    num_of_allloed_user: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'licenses'
  });
};
