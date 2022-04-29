import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/cards';

@Component({
    selector: 'app-navigation-cards',
    templateUrl: './navigation-cards.component.html',
    styleUrls: ['./navigation-cards.component.scss'],
})
export class NavigationCardsComponent {
  @Input() cards: Card[] | undefined;

  @Output()
      navigateToPage = new EventEmitter<string>();

  navigate(route: string): void {
      this.navigateToPage.emit(route);
  }
}
