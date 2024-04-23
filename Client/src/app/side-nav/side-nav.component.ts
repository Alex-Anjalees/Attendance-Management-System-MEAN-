import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faMoneyBill,
  faChartBar,
  faContactBook,
  faHand,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faMoneyBill = faMoneyBill;
  faChartBar = faChartBar;
  faContactBook = faContactBook;
  faHand = faHand;
  role: any;
  isDashboardActive: boolean = false;
  isUserListActive: boolean = false;
  isScheduleActive: boolean = false;
  isPositionsActive: boolean = false;
  isAttendanceSheetActive: boolean = false;
  isSheetReportActive: boolean = false;
  isAttendanceLogActive: boolean = false;
  isHelpActive: boolean = false;
  isEmployeeFeedbackActive: boolean = false;
  isSidebarMinimized: boolean = false;

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.getRole();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveRoute();
    });
  }

  getRole() {
    const user = this.storageService.getUser();
    this.role = user.roles[0];
  }

  setActiveRoute() {
    const currentUrl = this.router.url;
    this.isDashboardActive = currentUrl.includes('dashboard');
    this.isUserListActive = currentUrl.includes('user-list');
    this.isScheduleActive = currentUrl.includes('schedule');
    this.isPositionsActive = currentUrl.includes('positions');
    this.isAttendanceSheetActive = currentUrl.includes('attendance-sheet');
    this.isSheetReportActive = currentUrl.includes('sheet-report');
    this.isAttendanceLogActive = currentUrl.includes('attendance-log');
    this.isHelpActive = currentUrl.includes('home');
    this.isEmployeeFeedbackActive = currentUrl.includes('user');
  }

}