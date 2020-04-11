import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
// import { NotificationMsjUserComponent } from 'app/tools/notifi/notification-msgUser/notification-msg.component';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() onSave = new EventEmitter<User>();
  userForm: FormGroup;
  idParameter;
  title: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.idParameter = this.activatedRoute.snapshot.params['id'];
    this.title = this.idParameter ? "Editar Usuario " + this.idParameter : "Crear Usuario";
    if (this.idParameter) {
      this.userService.getUser(this.idParameter).subscribe(user => {
        this.createForm(user);
      });
    } else {
      this.createForm({ email: "", password: "", country: "" });
    }
  }
  createForm(user: User) {
    this.userForm = this.formBuilder.group({
      'email': [user.email, Validators.required],
      'password': [user.password, Validators.required],
      'country': [user.country, Validators.required],
    });
  }
  getFormData() {
    const formValue = this.userForm.getRawValue()
    return {
      email: formValue.email,
      password: formValue.password,
      country: formValue.country
    } as User
  }
  onSubmit() {
    if (!this.userForm.invalid) {
      const user = this.getFormData();
      let user$: Observable<User>;
      if (this.idParameter) {
        user$ = this.userService.updateUser(this.idParameter, user);
      } else {
        user$ = this.userService.createUser(user);
      }
      user$.subscribe(() => {
        this.router.navigate(['/user/list']);
      });
    }

  }
}
