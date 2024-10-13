import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  users: WritableSignal<User[]> = signal<User[]>([]);

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    // getting cached users from http-interceptor
    // setInterval(() => {
    //   this.getUsers();
    //   setInterval;
    // }, 3000);

    // getting cached users from local storage
    setInterval(() => {
      this.getCachedUsers();
      setInterval;
    }, 3000);
  }

  // getting cached users from local storage
  getCachedUsers() {
    this.usersService.getCachedUsers().subscribe((users) => {
      this.users.set(users);
    })
  }

}
