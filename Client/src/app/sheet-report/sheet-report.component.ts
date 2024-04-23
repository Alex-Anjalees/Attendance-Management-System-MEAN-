import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-sheet-report',
  templateUrl: './sheet-report.component.html',
  styleUrl: './sheet-report.component.css'
})
export class SheetReportComponent {
  dates: { date: string, day: string }[] = [];
  checked: any;
  content?: string;
  userList: any = [];
  errorMessage: string = '';
  positionList: any = [];
  attendance: any = {};
  today: string = this.formatDate(new Date());
  employeeId: any;
  date: any;
  attendanceList: any = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.generateDates();
    this.getAllUsersData();
    this.getAllAttendanceData();
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
        this.attendanceList = this.attendanceList.filter((item: { approved: string; }) => item.approved === 'yes')
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

  isAttendanceMarked(user: any, date: string, status: string): boolean {
    const userAttendance = this.attendanceList.find(
      (attendance: any) => attendance.employeeId === user.id && attendance.date === date && attendance.status === status
    );
    return !!userAttendance;
  }

}
