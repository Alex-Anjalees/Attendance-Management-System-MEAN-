module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    Dept_Code: {
      type: Sequelize.STRING
    },
    Department_Name: {
      type: Sequelize.STRING
    },
    Status: {
      type: Sequelize.STRING,
      defaultValue: 'inactive'
    }
  });

  return Department;
};