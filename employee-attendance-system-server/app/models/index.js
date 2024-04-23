const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.shift = require("../models/shift.model.js")(sequelize, Sequelize);
db.department = require("../models/department.model.js")(sequelize, Sequelize);
db.attendance = require("../models/attendance.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});
db.user.belongsTo(db.shift, { foreignKey: 'shiftId', as: 'shift' });
db.user.belongsTo(db.department, { foreignKey: 'departmentId', as: 'department' });
db.attendance.belongsTo(db.shift, { foreignKey: 'shiftId', as: 'shift' });
db.attendance.belongsTo(db.department, { foreignKey: 'departmentId', as: 'department' });
db.attendance.belongsTo(db.role, { foreignKey: 'roleId', as: 'role' });
db.attendance.belongsTo(db.user, { foreignKey: 'userId', as: 'user' });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
