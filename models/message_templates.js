/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message_templates', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    office_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'office_details',
        key: 'office_id'
      }
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    body: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
      timestamps: false
  },{
    tableName: 'message_templates'
  });
};
