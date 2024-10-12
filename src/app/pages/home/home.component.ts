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
  // userData: WritableSignal<User[]> = signal<User[]>([]);

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.postId = this.route.snapshot.params['postId'];
   }
  ngOnInit(): void {
    // this.userId = this.route.snapshot.params['id'];
    this.postId = this.route.snapshot.params['postId'];
    this.getUserPosts(this.userId);
    // this.getPostComments(this.postId);
  }

  getUserPosts(userId: number) {
    this.usersService.getUserPosts(userId)
    .subscribe((posts) => {
      this.userPosts.set(posts);
    })
  }

  // getUserData() {
  //   this.usersService.getUsers()
  //   .subscribe((users) => {
  //     this.userData.set(users);
  //   })
  // }

  getPostComments(postId: number) {
    this.showComments = !this.showComments;
    this.usersService.getPostComments(postId)
    .subscribe((comments) => {
      console.log("comments", comments);
      this.postComments.set(comments);
      console.log("comments", this.postComments());
    })
  }

  showPostComments(postId: number) {
    this.showComments = !this.showComments;
    this.getPostComments(postId);
  }

}
