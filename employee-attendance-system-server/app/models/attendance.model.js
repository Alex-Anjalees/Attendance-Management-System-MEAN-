const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Attendance = sequelize.define("attendance", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'departments',
                key: 'id'
            }
        },
        shiftId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'shifts',
                key: 'id'
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        attendanceDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        attendanceTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        present: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        approved: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'no'
        },
        addedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Attendance;
};
