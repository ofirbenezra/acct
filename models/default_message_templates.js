/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('default_message_templates', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    tableName: 'default_message_templates'
  });
};
