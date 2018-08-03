/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sender_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reciever_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    body: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    sent_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    file_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  },{
      timestamps: false
  }, {
    tableName: 'messages'
  });
};
