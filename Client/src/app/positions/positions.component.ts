import { UserService } from '../_services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {
  positionList: any = [];
  content?: string;
  positionForm!: FormGroup;
  errorMessage: any;
  showFormBoolean: boolean = false;
  showUpdateFormBoolean: boolean = false;
  isPositionList: boolean = true;
  positionId: any;
  showAlertMessage: boolean = false;
  message: string = '';
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllPositionData();
    this.initForm();
  }

  initForm(): void {
    this.positionForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      departmentCode: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.positionForm.valid) {
      this.userService.addPositions(this.positionForm).subscribe({
        next: data => {
          if (data['status'] == 200) {
            this.getAllPositionData();
            this.showFormBoolean = false;
            this.isPositionList = true;
            this.positionForm.reset();
            this.message = data['message'];
            this.showAlertMessage = true;
            setTimeout(() => {
              this.showAlertMessage = false;
            }, 3000);
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

  getAllPositionData() {
    this.userService.getAllPositions().subscribe({
      next: data => {
        this.positionList = data.reverse();
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

  addForm() {
    this.showFormBoolean = true;
    this.showUpdateFormBoolean = false;
    this.isPositionList = false;
    this.positionForm.reset();
  }

  goBack() {
    this.showFormBoolean = false;
    this.isPositionList = true;
    this.positionForm.reset();
  }

  goBackUpdate() {
    this.showUpdateFormBoolean = false;
    this.isPositionList = true;
    this.positionForm.reset();
  }

  editPositionData(shiftData: any) {
    this.positionId = shiftData.id;
    this.showUpdateFormBoolean = true;
    this.isPositionList = false;
    this.positionForm.reset();
    this.positionForm.patchValue({
      departmentName: shiftData.departmentName,
      departmentCode: shiftData.deptCode,
    });
  }

  deletePositionData(positionId: any) {
    this.positionId = positionId;
    this.userService.deletePosition(this.positionId).subscribe({
      next: data => {
        this.getAllPositionData();
        this.showFormBoolean = false;
        this.showUpdateFormBoolean = false;
        this.isPositionList = true;
        this.positionForm.reset();
        this.positionId = null;
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

  onSubmitUpdate(): void {
    if (this.positionForm.valid) {
      const positionId = this.positionId;
      const updateData = {
        positionId: positionId,
        departmentName: this.positionForm.value.departmentName,
        departmentCode: this.positionForm.value.departmentCode,
      };
      this.userService.updatePosition(updateData).subscribe({
        next: data => {
          if (data['status'] == 200) {
            this.getAllPositionData();
            this.showUpdateFormBoolean = false;
            this.isPositionList = true;
            this.positionForm.reset();
            this.message = data['message'];
            this.showAlertMessage = true;
            setTimeout(() => {
              this.showAlertMessage = false;
            }, 2000);
          } else {
            this.message = "Department is Not Added";
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
