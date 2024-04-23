import { UserService } from '../_services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-attendance-log',
  templateUrl: './attendance-log.component.html',
  styleUrl: './attendance-log.component.css'
})
export class AttendanceLogComponent {
  positionList: any = [];
  content?: string;
  positionForm!: FormGroup;
  errorMessage: any;
  attendanceList: any = [];
  role: any;
  userId: any;
  page: number = 1;
  itemsPerPage: number = 5;
  departmentId: any;
  selectedDepartment: string = '-Select-';

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getRole();
    this.initForm();
    this.getAllPositionData();
    if (this.role == 'admin') {
      this.getAllAttendanceData();
    } else {
      this.getAttendanceDataByUserId()
    }
  }

  getRole() {
    const user = this.storageService.getUser();
    this.userId = user.id;
    this.role = user.roles[0];
  }

  initForm(): void {
    this.positionForm = this.formBuilder.group({
      deparmentName: ['', Validators.required],
      deparmentCode: ['', Validators.required],
    });
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

  getAllAttendanceData() {
    this.userService.getAllAttendance().subscribe({
      next: data => {
        const filteredData = data.filter(item => item.status === 'present');
        this.attendanceList = filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
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

  getAttendanceStatus(timestamp: string, timeIn: string): string {
    const timestampDate = new Date(`2024-01-18 ${timestamp}`);
    const timeInDate = new Date(`2024-01-18 ${timeIn}`);
    if (timestampDate.getTime() <= timeInDate.getTime()) {
      return 'On Time';
    } else {
      return 'Late';
    }
  }

  addAttendance() {
    this.router.navigate(['/attendance-sheet']);
  }

  getAttendanceDataByUserId() {
    this.userService.getAttendanceByUserId(this.userId).subscribe({
      next: data => {
        const filteredData = data.filter(item => item.status === 'present');
        this.attendanceList = filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
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

  selectedDepartmentData(departmentId: any) {
    this.departmentId = departmentId;
    this.userService.getAttendanceByDepartmentId(this.departmentId).subscribe({
      next: data => {
        const filteredData = data.filter(item => item.status === 'present');
        this.attendanceList = filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
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

  refreshUser() {
    this.getAllAttendanceData();
    this.selectedDepartment = '-Select-';
  }

}
