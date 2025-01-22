import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BannedUsersComponent } from '../banned-users/banned-users.component';
import { ReportedUsersComponent } from '../reported-users/reported-users.component';
import { DislikedThreadsComponent } from '../disliked-threads/disliked-threads.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  @ViewChild('bannedUsers') bannedUsersComponent?: BannedUsersComponent;
  @ViewChild('reportedUsers') reportedUsersComponent?: ReportedUsersComponent;
  @ViewChild('dislikedThreads') dislikedThreadsComponent?: DislikedThreadsComponent;

  onTabChange(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.bannedUsersComponent?.loadData();
        break;
      case 1:
        this.reportedUsersComponent?.loadData();
        break;
      case 2:
        this.dislikedThreadsComponent?.loadData();
        break;
    }
  }
}
