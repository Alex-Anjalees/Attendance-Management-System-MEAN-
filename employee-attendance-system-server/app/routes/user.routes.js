const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.get("/api/test/dashboard", [authJwt.verifyToken], controller.dashBoard);

  app.get('/api/test/getAllUsers', [authJwt.verifyToken], controller.getAllUsers);

  app.get('/api/test/getAllShifts', [authJwt.verifyToken], controller.getAllShifts);

  app.post("/api/test/addShift", controller.addShift);

  app.get('/api/test/getAllPositions', [authJwt.verifyToken], controller.getAllPositions);

  app.post("/api/test/addPositions", controller.addPositions);

  app.post("/api/test/saveAllAttendance", controller.saveAllAttendance);

  app.get('/api/test/getAllAttendance', [authJwt.verifyToken], controller.getAllAttendance);

  app.post("/api/test/updateShift", controller.updateShift);

  app.post("/api/test/deleteShift", controller.deleteShift);

  app.post("/api/test/updatePosition", controller.updatePosition);

  app.post("/api/test/deletePosition", controller.deletePosition);

  app.get('/api/test/getAttendanceByUserId', [authJwt.verifyToken], controller.getAttendanceByUserId);

  app.get('/api/test/getUserById', [authJwt.verifyToken], controller.getUserById);
  
  app.get('/api/test/getUserByShiftId', [authJwt.verifyToken], controller.getUserByShiftId);
  
  app.get('/api/test/getUserByDepartmentId', [authJwt.verifyToken], controller.getUserByDepartmentId);
  
  app.get('/api/test/getAttendanceByDepartmentId', [authJwt.verifyToken], controller.getAttendanceByDepartmentId);

};


