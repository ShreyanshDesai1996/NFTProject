import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() onLogoutClick = new EventEmitter<void>();
  @Output() onThemeChange = new EventEmitter<string>();

  @Input() firstName: string | undefined;
  theme = 'dark';
  constructor(public router: Router) {}

  logout() {
      this.onLogoutClick.emit();
  }
  goHome(): void {
      this.router.navigateByUrl('/home/0');
  }
  setTheme(theme: string) {
      this.theme = theme;
      this.onThemeChange.emit(this.theme);
  }
}
