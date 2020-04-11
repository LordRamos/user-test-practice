import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent,
        data: { title: 'Usuarios' }
      },
      {
        path: 'create',
        component: UserFormComponent,
        data: { title: 'Usuarios' }
      },
      {
        path: 'update/:id',
        component: UserFormComponent,
        data: { title: 'Usuarios' }
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
