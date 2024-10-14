import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';
import { SpinnerService } from '../services/spinner.service';
import { TranslationService } from '../services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { languages } from '../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  users: WritableSignal<User[]> = signal<User[]>([]);
  languages = languages;
  isEnglish: boolean = true;

  constructor(
    private usersService: UsersService,
    private spinnerService: SpinnerService,
    private translationService: TranslationService,
    translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');
    // translateService.use('en');
   }

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
      this.spinnerService.busy();
      this.users.set(users);
      this.spinnerService.idle();
    })
  }

  changeLanguage(lang: string) {
    this.translationService.changeLang(lang);
    this.isEnglish = lang === 'en';
  }

}
