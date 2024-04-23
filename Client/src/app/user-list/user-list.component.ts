import { Component, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../_services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @ViewChild('editModal') editModal: any;
  content?: string;
  userList: any = [];
  positionList: any = [];
  shiftList: any = [];
  selectedShift: string = '-Select-';
  selectedDepartment: string = '-Select-';
  form: FormGroup;
  showPassword: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  errorMessage: string = '';
  showFormBoolean: boolean = false;
  showUpdateFormBoolean: boolean = false;
  isUserList: boolean = true;
  userId: any;
  showAlertMessage: boolean = false;
  message: string = '';
  page: number = 1;
  itemsPerPage: number = 5;
  shiftId: any;
  departmentId: any;

  constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: [null, Validators.required],
      schedule: [null, Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllUsersData();
    this.getAllShiftData();
    this.getAllPositionData();
  }

  getAllUsersData() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.userList = data.filter(user => user.role === 'user').reverse();
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

  getAllShiftData() {
    this.userService.getAllShifts().subscribe({
      next: data => {
        this.shiftList = data;
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

  get f() {
    return this.form.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.valid) {
      const userName = this.form.get('userName')!.value;
      const email = this.form.get('email')!.value;
      const password = this.form.get('password')!.value;
      const schedule = this.form.get('schedule')!.value;
      const position = this.form.get('position')!.value;
      this.authService.register(userName, email, password, schedule, position).subscribe({
        next: data => {
          this.getAllUsersData();
          this.showFormBoolean = false;
          this.showUpdateFormBoolean = false;
          this.isUserList = true;
          this.form.reset();
          this.userId = null;
          this.message = data.message;
          this.showAlertMessage = true;
          setTimeout(() => {
            this.showAlertMessage = false;
          }, 2000);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.message = this.errorMessage;
          this.showAlertMessage = true;
          setTimeout(() => {
            this.showAlertMessage = false;
          }, 2000);
        }
      });
    } else {
      this.message = 'Form is invalid. Please check the fields.';
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 2000);
    }
  }

  editUser(user: any) {
    this.userId = user.id;
    this.showUpdateFormBoolean = true;
    this.isUserList = false;
    this.form.reset();
    this.form.patchValue({
      userName: user.username,
      email: user.email,
      position: user.position,
      schedule: user.schedule
    });
  }

  deleteUser(userId: any) {
    this.userId = userId;
    this.authService.deleteUser(this.userId).subscribe({
      next: data => {
        this.getAllUsersData();
        this.showFormBoolean = false;
        this.showUpdateFormBoolean = false;
        this.isUserList = true;
        this.form.reset();
        this.userId = null;
        this.message = data.message;
        this.showAlertMessage = true;
        setTimeout(() => {
          this.showAlertMessage = false;
        }, 2000);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.message = this.errorMessage;
        this.showAlertMessage = true;
        setTimeout(() => {
          this.showAlertMessage = false;
        }, 2000);
      }
    });
  }

  goBack() {
    this.showFormBoolean = false;
    this.isUserList = true;
    this.form.reset();
  }

  goBackUpdate() {
    this.showUpdateFormBoolean = false;
    this.isUserList = true;
    this.form.reset();
  }

  addForm() {
    this.showFormBoolean = true;
    this.showUpdateFormBoolean = false;
    this.isUserList = false;
    this.form.reset();
  }

  onSubmitUpdate() {
    if (this.form.valid) {
      const userName = this.form.get('userName')!.value;
      const email = this.form.get('email')!.value;
      const password = this.form.get('password')!.value;
      const schedule = this.form.get('schedule')!.value;
      const position = this.form.get('position')!.value;
      this.authService.registerUpdate(userName, email, password, schedule, position, this.userId).subscribe({
        next: data => {
          this.getAllUsersData();
          this.showFormBoolean = false;
          this.showUpdateFormBoolean = false;
          this.isUserList = true;
          this.form.reset();
          this.userId = null;
          this.message = data.message;
          this.showAlertMessage = true;
          setTimeout(() => {
            this.showAlertMessage = false;
          }, 2000);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.message = this.errorMessage;
          this.showAlertMessage = true;
          setTimeout(() => {
            this.showAlertMessage = false;
          }, 2000);
        }
      });
    } else {
      this.message = 'Form is invalid. Please check the fields.';
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 2000);
    }
  }

  selectedShiftData(shiftId: any) {
    this.selectedDepartment = '-Select-';
    this.shiftId = shiftId;
    this.userService.getUserByShiftId(this.shiftId).subscribe({
      next: data => {
        this.userList = data.reverse();
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
    this.selectedShift = '-Select-';
    this.departmentId = departmentId;
    this.userService.getUserByDepartmentId(this.departmentId).subscribe({
      next: data => {
        this.userList = data.reverse();
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
    this.getAllUsersData();
    this.selectedShift = '-Select-';
    this.selectedDepartment = '-Select-';
  }
}
