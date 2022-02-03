import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    console.info('%cHi 😊 what are you looking for?', 'color: blue; font-size: 20px');
  }
}
