import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-form',
  templateUrl: './accept-form.component.html',
  styleUrl: './accept-form.component.scss'
})
export class AcceptFormComponent {

  constructor(private dialogRef: MatDialogRef<AcceptFormComponent>) { }

  close(res: boolean) {
    this.dialogRef.close(res);
  }
}
