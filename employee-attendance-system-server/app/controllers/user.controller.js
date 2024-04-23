const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Shift = db.shift;
const Department = db.department;
const Attendance = db.attendance;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).json({ message: "This Project is for creating the Employee Attendance Management System" });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.dashBoard = (req, res) => {
  res.status(200).send("Welcome to the Employee Attendance Management System");
};

exports.getAllUsers = (req, res) => {
  User.findAll({
    include: [
      Role,
      { model: Shift, as: 'shift', attributes: ['Shift'] },
      { model: Department, as: 'department', attributes: ['Department_Name', 'Dept_Code'] },
    ],
  })
    .then((users) => {
      const usersResponse = users.map(userData => ({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        schedule: userData.shiftId,
        shiftName: userData.shift ? userData.shift.Shift : null,
        memberSince: userData.createdAt,
        position: userData.departmentId,
        departmentName: userData.department ? userData.department.Department_Name : null,
        deptCode: userData.department ? userData.department.Dept_Code : null,
        role: userData.roles.length > 0 ? userData.roles[0].name : null,
        roleId: userData.roles.length > 0 ? userData.roles[0].id : null
      }));
      res.status(200).json(usersResponse);
    })
    .catch((err) => {
      console.error('Error retrieving users:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.getAllShifts = (req, res) => {
  Shift.findAll()
    .then((shifts) => {
      const shiftData = shifts.map(getShift => ({
        id: getShift.id,
        shift: getShift.Shift,
        timeIn: getShift.TimeIn,
        timeOut: getShift.TimeOut,
        addedOn: getShift.createdAt,
      }));
      res.status(200).json(shiftData);
    })
    .catch((err) => {
      console.error('Error retrieving users:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.addShift = async (req, res) => {
  try {
    const user = await Shift.create({
      Shift: req.body.shiftName,
      TimeIn: req.body.timeIn,
      TimeOut: req.body.timeOut,
    });
    if (user) {
      res.send({ status: 200, data: user, message: "Shift Added successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllPositions = (req, res) => {
  Department.findAll()
    .then((department) => {
      const departmentData = department.map(getDepartment => ({
        id: getDepartment.id,
        deptCode: getDepartment.Dept_Code,
        departmentName: getDepartment.Department_Name,
        status: getDepartment.Status,
        addedOn: getDepartment.createdAt,
      }));
      res.status(200).json(departmentData);
    })
    .catch((err) => {
      console.error('Error retrieving users:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.addPositions = async (req, res) => {
  try {
    const user = await Department.create({
      Dept_Code: req.body.departmentCode,
      Department_Name: req.body.departmentName,
      Status: 'active',
    });
    if (user) {
      res.send({ status: 200, data: user, message: "Department Added successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.saveAllAttendance = async (req, res) => {
  try {
    const existingAttendance = await Attendance.findOne({
      where: {
        userId: req.body.employeeId,
        attendanceDate: req.body.date,
      },
    });
    if (existingAttendance) {
      const updatedAttendance = await Attendance.update({
        present: req.body.status,
        addedBy: req.body.addedBy,
        approved: req.body.approved,
        attendanceTime: req.body.timestamp,
      }, {
        where: {
          userId: req.body.employeeId,
          attendanceDate: req.body.date,
        },
      });
      res.send({
        status: 200,
        data: updatedAttendance,
        message: "Attendance Updated successfully!",
      });
    } else {
      const newAttendance = await Attendance.create({
        attendanceDate: req.body.date,
        departmentId: req.body.departmentId,
        userId: req.body.employeeId,
        roleId: req.body.roleId,
        shiftId: req.body.shiftId,
        present: req.body.status,
        addedBy: req.body.addedBy,
        approved: req.body.approved,
        attendanceTime: req.body.timestamp,
      });

      if (newAttendance) {
        res.send({
          status: 200,
          data: newAttendance,
          message: "Attendance Added successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllAttendance = (req, res) => {
  Attendance.findAll({
    include: [
      { model: Shift, as: 'shift', attributes: ['Shift', 'TimeIn', 'TimeOut'] },
      { model: Department, as: 'department', attributes: ['Department_Name'] },
      { model: Role, as: 'role', attributes: ['name'] },
      { model: User, as: 'user', attributes: ['username'] },
    ],
  })
    .then((attendance) => {
      const attendanceData = attendance.map(getAttendance => ({
        id: getAttendance.id,
        employeeId: getAttendance.userId,
        username: getAttendance.username,
        username: getAttendance.user ? getAttendance.user.username : null,
        role: getAttendance.role ? getAttendance.role.name : null,
        departmentId: getAttendance.departmentId,
        departmentName: getAttendance.department ? getAttendance.department.Department_Name : null,
        roleId: getAttendance.roleId,
        shiftId: getAttendance.shiftId,
        shiftName: getAttendance.shift ? getAttendance.shift.Shift : null,
        timeIn: getAttendance.shift ? getAttendance.shift.TimeIn : null,
        timeOut: getAttendance.shift ? getAttendance.shift.TimeOut : null,
        status: getAttendance.present,
        addedBy: getAttendance.addedBy,
        approved: getAttendance.approved,
        timestamp: getAttendance.attendanceTime,
        date: getAttendance.attendanceDate,
      }));
      res.status(200).json(attendanceData);
    })
    .catch((err) => {
      console.error('Error retrieving Attendance:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.updateShift = async (req, res) => {
  try {
    const shiftId = req.body.shiftId;
    const existingShift = await Shift.findByPk(shiftId);
    if (!existingShift) {
      return res.status(404).send({ message: 'Shift not found' });
    }
    existingShift.Shift = req.body.shiftName;
    existingShift.TimeIn = req.body.timeIn;
    existingShift.TimeOut = req.body.timeOut;
    await existingShift.save();
    res.send({ status: 200, data: existingShift, message: 'Shift updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.deleteShift = async (req, res) => {
  try {
    const shiftId = req.body.shiftId;
    const existingShift = await Shift.findByPk(shiftId);
    if (!existingShift) {
      return res.status(404).send({ message: 'Shift not found' });
    }
    const associatedUsers = await User.findAll({
      where: { shiftId: shiftId },
    });
    if (associatedUsers.length > 0) {
      return res.status(200).send({ message: 'Cannot Delete Shift. Users are Enrolled in this shift.' });
    }
    await Attendance.destroy({
      where: { shiftId: shiftId },
    });
    await existingShift.destroy();
    res.send({ status: 200, data: existingShift, message: 'Shift deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const departmentId = req.body.positionId;
    const existingDepartment = await Department.findByPk(departmentId);
    if (!existingDepartment) {
      return res.status(404).send({ message: 'Department not found' });
    }
    existingDepartment.Dept_Code = req.body.departmentCode;
    existingDepartment.Department_Name = req.body.departmentName;
    await existingDepartment.save();
    res.send({ status: 200, data: existingDepartment, message: 'Department updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const departmentId = req.body.positionId;
    const existingDepartment = await Department.findByPk(departmentId);
    if (!existingDepartment) {
      return res.status(404).send({ message: 'Department not found' });
    }
    const associatedUsers = await User.findAll({
      where: { departmentId: departmentId },
    });
    if (associatedUsers.length > 0) {
      return res.status(200).send({ message: 'Cannot Delete Department. Users are Enrolled in this Department.' });
    }
    await Attendance.destroy({
      where: { departmentId: departmentId },
    });
    await existingDepartment.destroy();
    res.send({ status: 200, data: existingDepartment, message: 'Department deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getAttendanceByUserId = (req, res) => {
  const userId = req.query.userId;
  Attendance.findAll({
    where: {
      userId: userId,
    },
    include: [
      { model: Shift, as: 'shift', attributes: ['Shift', 'TimeIn', 'TimeOut'] },
      { model: Department, as: 'department', attributes: ['Department_Name'] },
      { model: Role, as: 'role', attributes: ['name'] },
      { model: User, as: 'user', attributes: ['username'] },
    ],
  })
    .then((attendance) => {
      if (!attendance || attendance.length === 0) {
        return res.status(404).json({ message: 'Attendance not found for the given userId.' });
      }
      const attendanceData = attendance.map((getAttendance) => ({
        id: getAttendance.id,
        employeeId: getAttendance.userId,
        username: getAttendance.user ? getAttendance.user.username : null,
        role: getAttendance.role ? getAttendance.role.name : null,
        departmentId: getAttendance.departmentId,
        departmentName: getAttendance.department ? getAttendance.department.Department_Name : null,
        roleId: getAttendance.roleId,
        shiftId: getAttendance.shiftId,
        shiftName: getAttendance.shift ? getAttendance.shift.Shift : null,
        timeIn: getAttendance.shift ? getAttendance.shift.TimeIn : null,
        timeOut: getAttendance.shift ? getAttendance.shift.TimeOut : null,
        status: getAttendance.present,
        addedBy: getAttendance.addedBy,
        approved: getAttendance.approved,
        timestamp: getAttendance.attendanceTime,
        date: getAttendance.attendanceDate,
      }));
      res.status(200).json(attendanceData);
    })
    .catch((err) => {
      console.error('Error retrieving Attendance:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.getUserById = (req, res) => {
  const userId = req.query.userId;
  User.findOne({
    where: {
      id: userId,
    },
    include: [
      Role,
      { model: Shift, as: 'shift', attributes: ['Shift'] },
      { model: Department, as: 'department', attributes: ['Department_Name', 'Dept_Code'] },
    ],
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found for the given userId.' });
      }
      const userDetails = {
        id: user.id,
        username: user.username,
        email: user.email,
        schedule: user.shiftId,
        shiftName: user.shift ? user.shift.Shift : null,
        memberSince: user.createdAt,
        position: user.departmentId,
        departmentName: user.department ? user.department.Department_Name : null,
        deptCode: user.department ? user.department.Dept_Code : null,
        role: user.roles.length > 0 ? user.roles[0].name : null,
        roleId: user.roles.length > 0 ? user.roles[0].id : null,
      };
      res.status(200).json(userDetails);
    })
    .catch((err) => {
      console.error('Error retrieving user details:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.getUserByShiftId = (req, res) => {
  const shiftId = req.query.shiftId;
  User.findAll({
    where: {
      shiftId: shiftId,
    },
    include: [
      Role,
      { model: Shift, as: 'shift', attributes: ['Shift'] },
      { model: Department, as: 'department', attributes: ['Department_Name', 'Dept_Code'] },
    ],
  })
    .then((users) => {
      const userDetailsList = users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        schedule: user.shiftId,
        shiftName: user.shift ? user.shift.Shift : null,
        memberSince: user.createdAt,
        position: user.departmentId,
        departmentName: user.department ? user.department.Department_Name : null,
        deptCode: user.department ? user.department.Dept_Code : null,
        role: user.roles.length > 0 ? user.roles[0].name : null,
        roleId: user.roles.length > 0 ? user.roles[0].id : null,
      }));
      res.status(200).json(userDetailsList);
    })
    .catch((err) => {
      console.error('Error retrieving user details by shiftId:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.getUserByDepartmentId = (req, res) => {
  const departmentId = req.query.departmentId;
  User.findAll({
    where: {
      departmentId: departmentId,
    },
    include: [
      Role,
      { model: Shift, as: 'shift', attributes: ['Shift'] },
      { model: Department, as: 'department', attributes: ['Department_Name', 'Dept_Code'] },
    ],
  })
    .then((users) => {
      const userDetailsList = users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        schedule: user.shiftId,
        shiftName: user.shift ? user.shift.Shift : null,
        memberSince: user.createdAt,
        position: user.departmentId,
        departmentName: user.department ? user.department.Department_Name : null,
        deptCode: user.department ? user.department.Dept_Code : null,
        role: user.roles.length > 0 ? user.roles[0].name : null,
        roleId: user.roles.length > 0 ? user.roles[0].id : null,
      }));
      res.status(200).json(userDetailsList);
    })
    .catch((err) => {
      console.error('Error retrieving user details by departmentId:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};

exports.getAttendanceByDepartmentId = (req, res) => {
  const departmentId = req.query.departmentId;
  Attendance.findAll({
    where: {
      departmentId: departmentId,
    },
    include: [
      { model: Shift, as: 'shift', attributes: ['Shift', 'TimeIn', 'TimeOut'] },
      { model: Department, as: 'department', attributes: ['Department_Name'] },
      { model: Role, as: 'role', attributes: ['name'] },
      { model: User, as: 'user', attributes: ['username'] },
    ],
  })
    .then((attendance) => {
      const attendanceData = attendance.map((getAttendance) => ({
        id: getAttendance.id,
        employeeId: getAttendance.userId,
        username: getAttendance.user ? getAttendance.user.username : null,
        role: getAttendance.role ? getAttendance.role.name : null,
        departmentId: getAttendance.departmentId,
        departmentName: getAttendance.department ? getAttendance.department.Department_Name : null,
        roleId: getAttendance.roleId,
        shiftId: getAttendance.shiftId,
        shiftName: getAttendance.shift ? getAttendance.shift.Shift : null,
        timeIn: getAttendance.shift ? getAttendance.shift.TimeIn : null,
        timeOut: getAttendance.shift ? getAttendance.shift.TimeOut : null,
        status: getAttendance.present,
        addedBy: getAttendance.addedBy,
        approved: getAttendance.approved,
        timestamp: getAttendance.attendanceTime,
        date: getAttendance.attendanceDate,
      }));
      res.status(200).json(attendanceData);
    })
    .catch((err) => {
      console.error('Error retrieving Attendance by departmentId:', err);
      res.status(500).json({ message: 'Internal server error.' });
    });
};






