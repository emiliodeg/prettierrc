import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  public copy() {
    navigator.clipboard.writeText(
      JSON.stringify({
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'none',
        proseWrap: 'always'
      })
    );
  }
}
