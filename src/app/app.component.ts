import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    console.info('%cHi 😊 what are you looking for?', 'color: blue; font-size: 20px');
    console.info(
      '%cCheck out the repository of this project: https://github.com/emiliodeg/prettierrc',
      'font-size: 14px'
    );
  }
}
