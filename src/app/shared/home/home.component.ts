import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isHomePage: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/';
    });
  }
}
