/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('office_accountanats', {
        acct_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        office_id: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        acct_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        timestamps: false
    }, {
        tableName: 'office_accountanats'
    });
};
