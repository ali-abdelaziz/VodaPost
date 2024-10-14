import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerService } from '../../shared/services/spinner.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NavbarComponent, RouterOutlet, CommonModule, SharedModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  showComments: boolean = false;
  userPosts: WritableSignal<any> = signal<any>([]);
  postComments: WritableSignal<any> = signal<any>([]);
  userData: WritableSignal<any> = signal<any>([]);
  userId!: number;
  postId!: number;
  userCachedPosts: WritableSignal<User[]> = signal<User[]>([]);

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService
  ) {

   }
  ngOnInit(): void {
    this.getCachedUserPosts(this.userId);
    this.route.params.subscribe((params) => {
      params['id'] ? this.userId = params['id'] : this.userId = 1
      const userPosts = localStorage.getItem('cachedUserPosts' + this.userId);
      userPosts ? JSON.parse(userPosts) : [];
      if (!userPosts) {
      this.getCachedUserPosts(this.userId );
      }
    })
    this.postId = this.route.snapshot.params['postId'];
    console.log(this.userId);
  }

  // getting cached userPosts from local storage
  getCachedUserPosts(userId: number) {
    if (userId) {
    this.usersService.getCachedUserPosts(userId)
    .subscribe((posts) => {
      this.spinnerService.busy();
      this.userPosts.set(posts);
      this.spinnerService.idle();
    })
  }
  }

  // getting cached postComments from local storage
  getCachedPostComments(postId: number) {
    this.usersService.getCachedPostComments(postId)
    .subscribe((comments) => {
      this.spinnerService.busy();
      this.postComments.set(comments);
      this.spinnerService.idle();
    })
  }

  showPostComments(postId: number) {
    this.showComments = !this.showComments;
    this.getCachedPostComments(postId);
  }

}
