// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import {MatNavModule, MatToolbarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../core/services/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from '../core/services/authentication.service';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserFormComponent

  ],
  imports: [
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    UserRoutingModule
  ],
  providers: [UserService, AuthenticationService],
  bootstrap: [UserComponent],

})
export class UserModule { }