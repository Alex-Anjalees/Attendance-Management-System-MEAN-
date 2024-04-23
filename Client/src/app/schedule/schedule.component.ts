import { UserService } from '../_services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  shiftList: any = [];
  content?: string;
  shiftForm!: FormGroup;
  errorMessage: any;
  showFormBoolean: boolean = false;
  showUpdateFormBoolean: boolean = false;
  isScheduleList: boolean = true;
  shiftId: any;
  role: any;
  showAlertMessage: boolean = false;
  message: string = '';
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getAllShiftData();
    this.initForm();
    this.getRole();
  }

  initForm(): void {
    this.shiftForm = this.formBuilder.group({
      shiftName: ['', Validators.required],
      timeIn: ['', Validators.required],
      timeOut: ['', Validators.required],
    });
  }

  getRole() {
    const user = this.storageService.getUser();
    this.role = user.roles[0];
  }

  onSubmit(): void {
    if (this.shiftForm.valid) {
      this.userService.addShift(this.shiftForm).subscribe({
        next: data => {
          if (data['status'] == 200) {
            this.getAllShiftData();
            this.showFormBoolean = false;
            this.isScheduleList = true;
            this.shiftForm.reset();
            this.message = data.message;
            this.showAlertMessage = true;
            setTimeout(() => {
              this.showAlertMessage = false;
            }, 2000);
          } else {
            this.message = "Shift is Not Added";
            this.showAlertMessage = true;
            setTimeout(() => {
              this.showAlertMessage = false;
            }, 2000);
          }
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

  getAllShiftData() {
    this.userService.getAllShifts().subscribe({
      next: data => {
        this.shiftList = data.reverse();
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

  goBack() {
    this.showFormBoolean = false;
    this.isScheduleList = true;
    this.shiftForm.reset();
  }

  goBackUpdate() {
    this.showUpdateFormBoolean = false;
    this.isScheduleList = true;
    this.shiftForm.reset();
  }

  addForm() {
    this.showFormBoolean = true;
    this.showUpdateFormBoolean = false;
    this.isScheduleList = false;
    this.shiftForm.reset();
  }

  editShiftData(shiftData: any) {
    this.shiftId = shiftData.id;
    this.showUpdateFormBoolean = true;
    this.isScheduleList = false;
    this.shiftForm.reset();
    this.shiftForm.patchValue({
      shiftName: shiftData.shift,
      timeIn: shiftData.timeIn,
      timeOut: shiftData.timeOut,
    });
  }

  deleteShiftData(shiftId: any) {
    this.shiftId = shiftId;
    this.userService.deleteShift(this.shiftId).subscribe({
      next: data => {
        this.getAllShiftData();
        this.showFormBoolean = false;
        this.showUpdateFormBoolean = false;
        this.isScheduleList = true;
        this.shiftForm.reset();
        this.shiftId = null;
        this.message = data.message;
        this.showAlertMessage = true;
        setTimeout(() => {
          this.showAlertMessage = false;
        }, 3000);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  onSubmitUpdate(): void {
    if (this.shiftForm.valid) {
      const shiftId = this.shiftId;
      const updateData = {
        shiftId: shiftId,
        shiftName: this.shiftForm.value.shiftName,
        timeIn: this.shiftForm.value.timeIn,
        timeOut: this.shiftForm.value.timeOut,
      };
      this.userService.updateShift(updateData).subscribe({
        next: data => {
          if (data['status'] == 200) {
            this.getAllShiftData();
            this.showUpdateFormBoolean = false;
            this.isScheduleList = true;
            this.shiftForm.reset();
            this.message = data['message'];
            this.showAlertMessage = true;
            setTimeout(() => {
              this.showAlertMessage = false;
            }, 2000);
          } else {
            this.message = "Shift is Not Added";
            this.showAlertMessage = true;
            setTimeout(() => {
              this.showAlertMessage = false;
            }, 2000);
          }
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
}
