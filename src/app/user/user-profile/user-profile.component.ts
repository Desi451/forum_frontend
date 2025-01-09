import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { ActivatedRoute } from '@angular/router';
import { user } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  public userData: user | undefined;

  constructor(private userService: UserService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const numericUserId = Number(userId);

    this.userService.get(numericUserId).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error('load failed', err);
      }
    });

  }

}
