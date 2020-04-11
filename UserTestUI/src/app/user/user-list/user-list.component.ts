import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['Email', 'Country', 'unit'];
  dataSource = new MatTableDataSource();
  users: User[] = []; resultsUser = 0;
  constructor(private userService: UserService, public dialog: MatDialog) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      console.log(error);
      alert('Error');
    }
    )
  }

  deleteUser(user: User) {
    this.ConfirmDelete(user.id, user);
  }

  ngOnInit() {
    this.getUsers();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ConfirmDelete(id, user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '280px',
      width: '600px',
      data: { id: id, user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(result).subscribe((data) => {
          this.getUsers();
        }, (error) => {
          console.log(error);
        });
      }
    });
  }




}

