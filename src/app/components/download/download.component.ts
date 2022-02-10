import { Component, Input } from '@angular/core';
import { IObject } from 'src/app/services/schema.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html'
})
export class DownloadComponent {
  @Input() options: IObject = {};

  public isDownloaded = false;
  public isCopied = false;

  public download(): void {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.options)));
    element.setAttribute('download', 'prettierrc.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    this.isDownloaded = true;
    this.isCopied = false;
  }

  public copy(): void {
    navigator.clipboard.writeText(JSON.stringify(this.options));
    this.isDownloaded = false;
    this.isCopied = true;
  }
}
