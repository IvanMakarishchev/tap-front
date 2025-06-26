import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { PetData } from '../../core/interfaces/common';
import { UserRequestsService } from '../../core/services/user/user-requests.service';

export interface DialogData {
  petName: string;
  petType: string;
  regNumber: string;
  chipNumber: string;
  userNotes: string;
}

@Component({
  selector: 'app-user-pets',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './user-pets.component.html',
  styleUrl: './user-pets.component.css',
})
export class UserPetsComponent {
  readonly dialog = inject(MatDialog);

  constructor(private userRequests: UserRequestsService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBox);

    dialogRef.afterClosed().subscribe((petData: PetData) => {
      if (petData !== undefined) {
        const newUserPet = this.userRequests
          .addNewUserPet(petData)
          .subscribe((data) => console.log(data));
      }
    });
  }
}

@Component({
  selector: 'dialog-box',
  templateUrl: 'dialog-box.html',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DialogBox {
  readonly dialogRef = inject(MatDialogRef<DialogBox>);

  newPetForm: FormGroup = new FormGroup({
    petName: new FormControl(),
    petType: new FormControl('', { validators: Validators.required }),
    regNumber: new FormControl(),
    chipNumber: new FormControl(),
    userNotes: new FormControl(),
  });

  onClose(): void {
    this.dialogRef.close();
  }
}
