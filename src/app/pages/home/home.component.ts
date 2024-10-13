import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NavbarComponent, RouterOutlet, CommonModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  showComments: boolean = false;
  userPosts: WritableSignal<any> = signal<any>([]);
  postComments: WritableSignal<any> = signal<any>([]);
  userId: number;
  postId: number;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.postId = this.route.snapshot.params['postId'];
   }
  ngOnInit(): void {
    this.getCachedUserPosts(this.userId);
  }

  // getting cached userPosts from local storage
  getCachedUserPosts(userId: number) {
    this.usersService.getCachedUserPosts(userId)
    .subscribe((posts) => {
      this.userPosts.set(posts);
    })
  }

  // getting cached postComments from local storage
  getCachedPostComments(postId: number) {
    this.usersService.getCachedPostComments(postId)
    .subscribe((comments) => {
      this.postComments.set(comments);
    })
  }

  showPostComments(postId: number) {
    this.showComments = !this.showComments;
    this.getCachedPostComments(postId);
  }

}
