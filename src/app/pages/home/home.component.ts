import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  showComments: boolean = false;
  userPosts: WritableSignal<any> = signal<any>([]);
  userId: number;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params['id'];
   }
  ngOnInit(): void {
    // this.userId = this.route.snapshot.params['id'];
    this.getUserPosts(this.userId);
  }

  getUserPosts(userId: number) {
    return this.usersService.getUserPosts(userId)
    .subscribe((posts) => {
      this.userPosts.set(posts);
    })
  }

  viewComments() {
    this.showComments = !this.showComments;
  }

}
