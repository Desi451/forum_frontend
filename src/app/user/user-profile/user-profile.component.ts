import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { ActivatedRoute } from '@angular/router';
import { user } from '../../models/user';
import { SnackBarService } from '../../core/services/snackbar-service';
import { MatDialog } from '@angular/material/dialog';
import { ReasonFormComponent } from '../../shared/reason-form/reason-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  public userData: user | undefined;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const numericUserId = Number(userId);

    this.userService.get(numericUserId).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        this.snackBarService.handleErrors(err.error, 'Ok');
      }
    });
  }

  report(id: number | undefined) {
    this.dialog.open(ReasonFormComponent, {
      width: '400px',
      data: { id }
    });
  }
}
