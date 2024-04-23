import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent implements OnInit {
  dates: { date: string, day: string }[] = [];
  checked: any;
  content?: string;
  userList: any = [];
  errorMessage: string = '';
  positionList: any = [];
  attendance: any = {};
  today: string = this.formatDate(new Date());
  day2: any;
  employeeName: string | undefined;
  attendanceData: any = [];
  employeeId: any;
  departmentId: any;
  shiftId: any;
  roleId: any;
  date: any;
  present: any;
  timestamp: any;
  attendanceList: any = [];
  role: any;
  userId: any;
  approvedList: any = [];
  notApprovedList: any = [];
  selectedType: string = '-Select-';
  isAttendanceList: boolean = true;
  isAttendanceResponseList: boolean = false;
  page: number = 1;
  itemsPerPage: number = 5;
  selectedDepartment: string = '-Select-';

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.userId = user.id;
    this.role = user.roles[0];
    this.generateDates();
    this.getAllUsersData();
    this.getAllAttendanceData();
    this.getAllPositionData();
  }

  generateDates() {
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = -7; i <= 1; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const formattedDate = this.formatDate(nextDate);
      let dayOfWeek = daysOfWeek[nextDate.getDay()];
      if (formattedDate === this.today) {
        dayOfWeek = 'Today';
      }
      this.dates.push({ date: formattedDate, day: dayOfWeek });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getAllUsersData() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.userList = data;
      },
      error: err => {
        console.log(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  getAllAttendanceData() {
    this.userService.getAllAttendance().subscribe({
      next: data => {
        this.attendanceList = data;
        this.approvedList = this.attendanceList.filter((item: { approved: string; }) => item.approved === 'yes' || item.approved === 'pending');
        this.notApprovedList = this.attendanceList.filter((item: {
          addedBy: string; approved: string;
        }) => item.approved === 'no' && item.addedBy === 'user').reverse();
      },
      error: err => {
        console.log(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  markAttendance(employee: any, date: string, present: string) {
    this.employeeName = employee.username;
    this.employeeId = employee.id;
    this.departmentId = employee.position;
    this.shiftId = employee.schedule;
    this.roleId = employee.roleId;
    this.date = date;
    this.present = present;
    this.timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    if (!this.attendance[employee]) {
      this.attendance[employee] = {};
    }
    this.attendance[employee][date] = {
      status: present,
      timestamp: this.timestamp,
    };
    this.attendanceData = {
      employeeId: this.employeeId,
      departmentId: this.departmentId,
      shiftId: this.shiftId,
      roleId: this.roleId,
      date: this.date,
      status: this.present,
      timestamp: this.timestamp,
      approved: present ? 'yes' : 'pending',
      addedBy: this.role,
    };
    this.saveAllAttendanceToBackend(this.attendanceData);
  }

  saveAllAttendanceToBackend(attendanceData: any) {
    this.userService.saveAllAttendance(attendanceData).subscribe({
      next: data => {
        if (data['status'] == 200) {
          this.getAllAttendanceData();
          this.selectedType = '-Select-';
        } else {
          console.log("Attendance is Not Added");
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  toggleAttendance(user: any, date: string) {
    const isPresent = this.isAttendanceMarked(user, date, 'present');
    const isAbsent = this.isAttendanceMarked(user, date, 'absent');
    if (isPresent) {
      this.markAttendance(user, date, 'absent');
    } else if (isAbsent) {
      this.markAttendance(user, date, '');
    } else {
      this.markAttendance(user, date, 'present');
    }
  }

  isAttendanceMarked(user: any, date: string, status: string): boolean {
    const userAttendance = this.approvedList.find(
      (attendance: any) => attendance.employeeId === user.id && attendance.date === date && attendance.status === status
    );
    return !!userAttendance;
  }

  requestList() {
    this.isAttendanceResponseList = true;
    this.isAttendanceList = false;
  }

  selectedResponse(selectedValue: string, employee: any): void {
    this.attendanceData = {
      employeeId: employee.employeeId,
      departmentId: employee.departmentId,
      shiftId: employee.shiftId,
      roleId: employee.roleId,
      date: employee.date,
      status: employee.status,
      timestamp: employee.timestamp,
      approved: selectedValue,
      addedBy: employee.addedBy,
    };
    this.saveAllAttendanceToBackend(this.attendanceData);
  }

  goBack() {
    this.isAttendanceResponseList = false;
    this.isAttendanceList = true;
  }

  getAllPositionData() {
    this.userService.getAllPositions().subscribe({
      next: data => {
        this.positionList = data;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  refreshUser() {
    this.getAllUsersData();
    this.selectedDepartment = '-Select-';
  }

  selectedDepartmentData(departmentId: any) {
    this.departmentId = departmentId;
    this.userService.getUserByDepartmentId(this.departmentId).subscribe({
      next: data => {
        this.userList = data;
      },
      error: err => {
        console.log(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }
}


