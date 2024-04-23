module.exports = (sequelize, Sequelize) => {
  const Shift = sequelize.define("shift", {
    Shift: {
      type: Sequelize.STRING
    },
    TimeIn: {
      type: Sequelize.STRING
    },
    TimeOut: {
      type: Sequelize.STRING
    }
  });

  return Shift;
};
