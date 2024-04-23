import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserListComponent } from './user-list/user-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PositionsComponent } from './positions/positions.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { SheetReportComponent } from './sheet-report/sheet-report.component';
import { AttendanceLogComponent } from './attendance-log/attendance-log.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'positions', component: PositionsComponent },
  { path: 'attendance-sheet', component: AttendanceSheetComponent },
  { path: 'sheet-report', component: SheetReportComponent },
  { path: 'attendance-log', component: AttendanceLogComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
