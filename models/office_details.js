/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('office_details', {
    office_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    office_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'office_types',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    street_number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING(24),
      allowNull: true
    }
  }, {
      timestamps: false
  },{
    tableName: 'office_details'
  });
};
