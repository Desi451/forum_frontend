import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  handleErrors(errors: any[], action: string = 'Ok') {
    if (errors.length > 0) {
      errors.forEach((error) => {
        this.openSnackBar(error.message, action);
      });
    }
  }
}
