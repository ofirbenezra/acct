/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('files', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        file_id: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        s3_url: {
            type: DataTypes.STRING(100),
            allowNull: true
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
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        downloaded : {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: false
    }, {
        tableName: 'files'
    });
};
