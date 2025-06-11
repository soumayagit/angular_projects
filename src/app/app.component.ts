import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericTableComponent, Column } from './generic-table/generic-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    StarRatingComponent,
    GenericTableComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  userColumns: Column[] = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Rôle', sortable: true }
  ];
userData = [
  { name: 'Soumaya', email: 'soumaya@gmail.com', role: 'Admin' },
  { name: 'Takwa', email: 'takwa94@gmail.com', role: 'User' },
  { name: 'Zied', email: 'zied@gmail.com', role: 'Editor' },
  { name: 'Sami', email: 'sami111@gmail.com', role: 'User' },
  { name: 'wided', email: 'wided@gmail.com', role: 'Admin' },
  { name: 'mounir', email: 'mounir54@gmail.com', role: 'Editor' }
];
  headers: string[] = [];
  headerLabels: { [key: string]: string } = {};
  userList: any[] = [];
  message = '';
  rating = 1;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userList = this.userService.getUsers();

    // Initialisation du formulaire
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    // Préparation des données à injecter dans le template
    this.headers = this.userColumns.map((c: Column) => c.key);
    this.headerLabels = this.userColumns.reduce((acc: { [key: string]: string }, c: Column) => {
      acc[c.key] = c.label;
      return acc;
    }, {});
  }

  onClick() {
    console.log('Bouton cliqué !');
  }

  onRowSelected(row: any) {
    alert(`Ligne sélectionnée : ${row.name}`);
  }

  onRatingChanged(newRating: number): void {
    this.rating = newRating;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulaire soumis :', this.form.value);
    } else {
      console.log('Formulaire invalide');
    }
  }
}
