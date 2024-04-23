import { Component, Renderer2, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  content?: string;
  positionList: any = [];
  attendanceList: any = [];
  attendanceListPresent: any[] | undefined;
  attendanceListAbsent: any[] | undefined;
  shiftList: any = [];
  userList: any = [];
  userListLength: any;
  attendanceListLength: any;
  shiftListLength: any;
  positionListLength: any;
  departmentEmployeeCount: { [key: string]: { count: number, id: string, name: string, deptCode: string } } = {};
  onTimeCount: any = [];
  lateCount: any = [];
  totalAttendance: any;
  onTimePercentage: any;
  latePercentage: any;
  presentAttendanceList: any = [];
  presentPercentage: any;
  absentAttendanceList: any = [];
  absentPercentage: any;
  attendanceListAllUntilNow: any = [];
  currentDate: any;
  role: any;
  userId: any;
  userListById: any = [];
  attendanceListByUser: any = [];
  todayAttendanceStatus: any;
  absentCount: any;
  presentCount: any;
  lastSevenDaysAttendance: any = [];
  presentWeeklyPercentage: any = [];
  absentWeeklyPercentage: any = [];
  formData: any = {};
  errorMessage: any;
  attendanceData: any = [];
  timestamp: string | undefined;
  showMarkAttendanceForm: boolean = false;
  showStudentDashboard: boolean = true;
  approvedList: any = [];
  notApprovedList: any = [];
  showMarkAttendanceBoolean: boolean = true;
  lastSevenDaysAttendanceFilter: any = [];
  notApprovedListToday: any = [];
  rejectedListToday: any = [];
  todayAttendanceStatusColor: string | undefined;
  showAlertMessage: boolean = false;
  message: string = '';
  getTodayAttendanceData: any = [];
  getWeekAttendanceData: any;
  selectedMonth: number = new Date().getMonth() + 1;
  selectedMonthOption: string = '-Select-Month-';
  selectedDate: string = '';
  selectedWeek: string = '';
  startDate: string = '';
  endDate: string = '';
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  constructor(private userService: UserService, private renderer: Renderer2, private storageService: StorageService, private el: ElementRef) { }

  ngOnInit(): void {
    this.getDashboardContent();
    this.getRole();
    this.getAllUsersData();
    this.getAllPositionData();
    this.getAllAttendanceData();
    this.getAllShiftData();
    this.updateCurrentDate();
    this.selectedMonthOption = '-Select-Month-';
    setInterval(() => {
      this.updateCurrentDate();
    }, 1000);
    if (this.role == 'user') {
      this.getUserByIdData();
      this.getAttendanceDataByUserId()
    }
  }

  getRole() {
    const user = this.storageService.getUser();
    this.userId = user.id;
    this.role = user.roles[0];
  }

  updateCurrentDate(): void {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    const date = new Date();
    this.currentDate = date.toLocaleString('en-US', options);
  }

  getDashboardContent() {
    this.userService.getDashboard().subscribe({
      next: data => {
        this.content = data;
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

  ngAfterViewInit() {
    this.setupOffcanvasToggle();
    this.initProgressBars();
  }

  private setupOffcanvasToggle() {
    const offcanvasToggle = document.querySelector('[data-toggle=offcanvas]');
    if (offcanvasToggle) {
      this.renderer.listen(offcanvasToggle, 'click', () => {
        const rowOffcanvas = document.querySelector('.row-offcanvas');
        if (rowOffcanvas) {
          rowOffcanvas.classList.toggle('active');
        }
      });
    }
  }

  getAllPositionData() {
    this.userService.getAllPositions().subscribe({
      next: data => {
        this.positionList = data;
        this.positionListLength = data.length
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

  getAttendanceStatus(timestamp: string, timeIn: string): string {
    const timestampDate = new Date(`2024-01-18 ${timestamp}`);
    const timeInDate = new Date(`2024-01-18 ${timeIn}`);
    if (timestampDate.getTime() <= timeInDate.getTime()) {
      return 'On Time';
    } else {
      return 'Late';
    }
  }

  getAllAttendanceData() {
    this.userService.getAllAttendance().subscribe({
      next: data => {
        this.attendanceListAllUntilNow = data;
        this.attendanceListAllUntilNow = this.attendanceListAllUntilNow.filter((item: { approved: string; }) => item.approved === 'yes');
        this.attendanceListLength = this.attendanceListAllUntilNow.length;
        this.resetData();
        this.getAttendanceForToday();
      },
      error: err => {
        console.log(err);
        if (err.error) {
        } else {
        }
      }
    });
  }

  getAttendanceForToday() {
    this.resetData();
    const today = new Date().toISOString().split('T')[0];
    this.getTodayAttendanceData = this.attendanceListAllUntilNow
      .filter((attendance: { date: string; }) => attendance.date === today);
    this.attendanceList = this.getTodayAttendanceData;
    this.presentAttendanceList = this.getPresentAttendanceList();
    this.calculateAttendanceCounts();
  }

  getAttendanceForThisWeek() {
    this.resetData();
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    const lastDayOfWeek = new Date(today);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    const formattedFirstDay = this.formatDate(firstDayOfWeek);
    const formattedLastDay = this.formatDate(lastDayOfWeek);
    this.getWeekAttendanceData = this.attendanceListAllUntilNow
      .filter((attendance: { date: string; }) => attendance.date >= formattedFirstDay && attendance.date <= formattedLastDay);
    this.attendanceList = this.getWeekAttendanceData;
    this.presentAttendanceList = this.getPresentAttendanceList();
    this.calculateAttendanceCounts();
  }

  getAttendanceForSelectedMonth() {
    this.resetData();
    this.selectedDate = '';
    this.selectedWeek = '';
    this.startDate = '';
    this.endDate = '';
    if (this.selectedMonth !== null) {
      const filteredMonthData = this.attendanceListAllUntilNow
        .filter((attendance: { date: string; }) => {
          const month = new Date(attendance.date).getMonth() + 1;
          return month === this.selectedMonth;
        });
      this.attendanceList = filteredMonthData;
      this.presentAttendanceList = this.getPresentAttendanceList();
      this.calculateAttendanceCounts();
    }
  }

  onMonthSelect(event: any) {
    console.log("Mont >>event>>>", event);
    this.selectedMonth = parseInt(event, 10);
    console.log("this.selectedMonth>>>", this.selectedMonth);
    this.getAttendanceForSelectedMonth();
  }

  getAttendanceForSelectedDate() {
    this.resetData();
    this.selectedMonthOption = '-Select-Month-';
    this.selectedWeek = '';
    this.startDate = '';
    this.endDate = '';
    if (this.selectedDate) {
      const filteredDateData = this.attendanceListAllUntilNow
        .filter((attendance: { date: string; }) => attendance.date === this.selectedDate);
      this.attendanceList = filteredDateData;
      this.presentAttendanceList = this.getPresentAttendanceList();
      this.calculateAttendanceCounts();
    }
  }

  onDateSelect(event: any) {
    this.selectedDate = event;
    this.getAttendanceForSelectedDate();
  }

  getPresentAttendanceList(): any[] {
    return this.attendanceList.filter((attendance: { status: string; }) => attendance.status === 'present');
  }

  getAbsentAttendanceList(): any[] {
    return this.attendanceList.filter((attendance: { status: string; }) => attendance.status === 'absent');
  }

  calculateAttendanceCounts() {
    this.absentAttendanceList = this.getAbsentAttendanceList();
    for (const attendance of this.presentAttendanceList) {
      const status = this.getAttendanceStatus(attendance.timestamp, attendance.timeIn);
      if (status === 'On Time') {
        this.onTimeCount.push(attendance.employeeId);
      } else if (status === 'Late') {
        this.lateCount.push(attendance.employeeId);
      }
    }
    this.totalAttendance = this.attendanceList.length;
    if (this.totalAttendance > 0) {
      this.onTimePercentage = ((this.onTimeCount.length / this.totalAttendance) * 100).toFixed(1);
    } else {
      this.onTimePercentage = 0;
    }
    if (this.totalAttendance > 0) {
      this.absentPercentage = ((this.absentAttendanceList.length / this.totalAttendance) * 100).toFixed(1);
    } else {
      this.absentPercentage = 0;
    }
    this.presentPercentage = ((this.presentAttendanceList.length / this.attendanceListLength) * 100).toFixed(1);
    this.latePercentage = ((this.lateCount.length / this.totalAttendance) * 100).toFixed(1);
    if (this.totalAttendance > 0) {
      this.latePercentage = parseFloat(this.latePercentage);
    } else {
      this.latePercentage = 0;
    }
    this.presentPercentage = parseFloat(this.presentPercentage);
    this.onTimePercentage = parseFloat(this.onTimePercentage);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  resetData() {
    this.attendanceList = [];
    this.presentAttendanceList = [];
    this.getTodayAttendanceData = [];
    this.getWeekAttendanceData = [];
    this.absentAttendanceList = [];
    this.onTimeCount = [];
    this.lateCount = [];
    this.totalAttendance = 0;
    this.onTimePercentage = 0;
    this.latePercentage = 0;
    this.presentPercentage = 0;
    this.absentPercentage = 0;
  }


  getAllShiftData() {
    this.userService.getAllShifts().subscribe({
      next: data => {
        this.shiftList = data;
        this.shiftListLength = data.length;
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

  getAllUsersData() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.userList = data.filter(user => user.role === 'user');
        this.userListLength = this.userList.length;
        const usersByDepartment = this.userList.reduce((acc: any, user: any) => {
          const departmentId = user.position;
          if (!acc[departmentId]) {
            acc[departmentId] = {
              name: user.departmentName,
              deptCode: user.deptCode,
              employees: []
            };
          }
          acc[departmentId].employees.push(user);
          return acc;
        }, {});
        const usersByShift = this.userList.reduce((acc: any, user: any) => {
          const shiftId = user.schedule;
          if (!acc[shiftId]) {
            acc[shiftId] = {
              name: user.shiftName,
              employees: []
            };
          }
          acc[shiftId].employees.push(user);
          return acc;
        }, {});
        this.departmentEmployeeCount = Object.keys(usersByDepartment).reduce((acc: any, key: any) => {
          acc[key] = {
            id: key,
            name: usersByDepartment[key].name,
            deptCode: usersByDepartment[key].deptCode,
            count: usersByDepartment[key].employees.length
          };
          return acc;
        }, {});
        const shiftEmployeeCount = Object.keys(usersByShift).reduce((acc: any, key: any) => {
          acc[key] = {
            id: key,
            name: usersByShift[key].name,
            count: usersByShift[key].employees.length
          };
          return acc;
        }, {});
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

  getUserByIdData() {
    this.userService.getUserById(this.userId).subscribe({
      next: data => {
        this.userListById = data;
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

  getAttendanceDataByUserId() {
    this.userService.getAttendanceByUserId(this.userId).subscribe({
      next: data => {
        const filteredData = data;
        this.approvedList = this.attendanceList.filter((item: { approved: string; }) => item.approved === 'yes');
        this.notApprovedList = this.attendanceList.filter((item: { approved: string; }) => item.approved === 'no');
        this.attendanceListByUser = filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
        this.getTodayAttendanceDetails();
        this.processLastSevenDaysAttendance();
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

  getTodayAttendanceDetails() {
    const currentDate = new Date().toISOString().split('T')[0];
    const todayAttendance = this.attendanceListByUser.filter((item: { date: string; }) => item.date === currentDate);
    this.notApprovedListToday = todayAttendance.filter((item: { approved: string; }) => item.approved === 'no');
    this.rejectedListToday = todayAttendance.filter((item: { approved: string; }) => item.approved === 'rejected');
    if (todayAttendance.length === 0) {
      this.todayAttendanceStatus = `Attendance is not marked on ${currentDate} (Today)`;
      this.showMarkAttendanceBoolean = true;
      this.todayAttendanceStatusColor = '#8a4913';
    } else if (this.notApprovedListToday.length != 0) {
      this.todayAttendanceStatus = `Please wait for Approval from the Admin; Attendance on ${currentDate} (Today) is currently Pending.`;
      this.showMarkAttendanceBoolean = false;
      this.todayAttendanceStatusColor = 'blue';
    } else if (this.rejectedListToday.length != 0) {
      this.todayAttendanceStatus = `Your attendance request for today (${currentDate}) has been rejected by the admin. For more details, please contact the admin.`;
      this.showMarkAttendanceBoolean = false;
      this.todayAttendanceStatusColor = 'red';
    }
    else {
      todayAttendance.forEach((item: { timestamp: any; timeIn: any; status: string; username: any; }) => {
        const timestamp = new Date(`${currentDate} ${item.timestamp}`);
        const timeIn = new Date(`${currentDate} ${item.timeIn}`);

        if (item.status === 'absent') {
          this.todayAttendanceStatus = `${item.username} was absent on ${currentDate} (Today)`;
          this.showMarkAttendanceBoolean = false;
          this.todayAttendanceStatusColor = 'red';
        } else if (item.status === 'present') {
          if (timestamp > timeIn) {
            this.todayAttendanceStatus = `${item.username} was late on ${currentDate} (Today)`;
            this.showMarkAttendanceBoolean = false;
            this.todayAttendanceStatusColor = '#8a4913';
          } else {
            this.todayAttendanceStatus = `${item.username} was on time on ${currentDate} (Today)`;
            this.showMarkAttendanceBoolean = false;
            this.todayAttendanceStatusColor = 'green';
          }
        } else {
          this.todayAttendanceStatus = `${item.username} has been marked on the pending list by the Admin. Please contact the Admin for further details regarding the attendance of ${currentDate} (today).`;
          this.showMarkAttendanceBoolean = false;
          this.todayAttendanceStatusColor = 'purple';
        }
      });
    }
  }

  processLastSevenDaysAttendance() {
    const currentDate = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoDate = sevenDaysAgo.toISOString().split('T')[0];
    this.lastSevenDaysAttendanceFilter = this.attendanceListByUser.filter((item: { approved: string; }) => item.approved === 'yes');
    this.lastSevenDaysAttendance = this.lastSevenDaysAttendanceFilter.filter((item: { date: string; }) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(sevenDaysAgoDate) && itemDate <= new Date(currentDate);
    });
    this.absentCount = this.lastSevenDaysAttendance.filter((item: { status: string; }) => item.status.toLowerCase() === 'absent').length;
    this.presentCount = this.lastSevenDaysAttendance.filter((item: { status: string; }) => item.status.toLowerCase() === 'present').length;
    this.presentWeeklyPercentage = ((this.presentCount / this.lastSevenDaysAttendance.length) * 100).toFixed(1);
    this.presentWeeklyPercentage = parseFloat(this.presentWeeklyPercentage);
    this.absentWeeklyPercentage = ((this.absentCount / this.lastSevenDaysAttendance.length) * 100).toFixed(1);
    this.absentWeeklyPercentage = parseFloat(this.absentWeeklyPercentage);
  }

  private initProgressBars(): void {
    const progressBars = this.el.nativeElement.querySelectorAll('.progress');
    progressBars.forEach((progressBar: Element) => {
      const value = progressBar.getAttribute('data-value');
      const left = progressBar.querySelector('.progress-left .progress-bar') as HTMLElement;
      const right = progressBar.querySelector('.progress-right .progress-bar') as HTMLElement;
      if (value && parseInt(value) > 0) {
        const numericValue = parseInt(value);
        if (numericValue <= 50) {
          this.renderer.setStyle(right, 'transform', `rotate(${this.percentageToDegrees(numericValue)}deg)`);
        } else {
          this.renderer.setStyle(right, 'transform', 'rotate(180deg)');
          this.renderer.setStyle(left, 'transform', `rotate(${this.percentageToDegrees(numericValue - 50)}deg)`);
        }
      }
    });
  }

  private percentageToDegrees(percentage: number): number {
    return (percentage / 100) * 360;
  }

  showMarkAttendance() {
    this.showMarkAttendanceForm = true;
    this.showStudentDashboard = false;
    this.formData.reset();
  }

  submitForm(form: any): void {
    const currentDate = new Date().toISOString().split('T')[0];
    if (form.valid) {
      if (form.value.date == currentDate) {
        this.timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        this.attendanceData = {
          employeeId: this.userListById.id,
          departmentId: this.userListById.position,
          shiftId: this.userListById.schedule,
          roleId: this.userListById.roleId,
          date: form.value.date,
          status: form.value.status,
          timestamp: this.timestamp,
          approved: 'no',
          addedBy: this.role,
        };
        this.saveAllAttendanceToBackend(this.attendanceData);
        form.resetForm();
      } else {
        this.message = "Please Enter the Today's date";
        this.showAlertMessage = true;
        setTimeout(() => {
          this.showAlertMessage = false;
        }, 2000);
      }
    } else {
      this.message = "Please Fill the Required Fields";
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 2000);
    }
  }

  saveAllAttendanceToBackend(attendanceData: any) {
    this.userService.saveAllAttendance(attendanceData).subscribe({
      next: data => {
        if (data['status'] == 200) {
          this.getAllAttendanceData();
          this.getAttendanceDataByUserId();
          this.showMarkAttendanceForm = false;
          this.showStudentDashboard = true;
        } else {
          console.log("Attendance is Not Added");
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  goBackUpdate() {
    this.showMarkAttendanceForm = false;
    this.showStudentDashboard = true;
  }

  getAttendanceForSelectedWeek() {
    this.resetData();
    this.selectedMonthOption = '-Select-Month-';
    this.selectedDate = '';
    this.startDate = '';
    this.endDate = '';
    if (this.selectedWeek) {
      const [year, weekNumber] = this.selectedWeek.split('-W');
      const startDate = this.getDateOfISOWeek(Number(year), Number(weekNumber));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      const formattedStartDate = this.formatDateWeek(startDate);
      const formattedEndDate = this.formatDateWeek(endDate);
      const filteredWeekData = this.attendanceListAllUntilNow
        .filter((attendance: { date: string; }) => attendance.date >= formattedStartDate && attendance.date <= formattedEndDate);
      this.attendanceList = filteredWeekData;
      this.presentAttendanceList = this.getPresentAttendanceList();
      this.calculateAttendanceCounts();
    }
  }

  onWeekSelect(event: any) {
    this.selectedWeek = event;
    this.getAttendanceForSelectedWeek();
  }

  getDateOfISOWeek(year: number, week: number): Date {
    const date = new Date(year, 0, 1 + (week - 1) * 7);
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  formatDateWeek(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getAttendanceForSelectedRange() {
    this.selectedMonthOption = '-Select-Month-';
    this.selectedDate = '';
    this.selectedWeek = '';
    if (this.startDate && this.endDate) {
      const filteredDateRangeData = this.attendanceListAllUntilNow
        .filter((attendance: { date: string; }) => attendance.date >= this.startDate && attendance.date <= this.endDate);
      this.attendanceList = filteredDateRangeData;
      this.presentAttendanceList = this.getPresentAttendanceList();
      this.calculateAttendanceCounts();
    }
  }

}
