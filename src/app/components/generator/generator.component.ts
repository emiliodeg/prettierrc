import { Component, OnInit } from '@angular/core';
import { combineLatest, tap } from 'rxjs';
import { IObject, IProperty, SchemaService } from 'src/app/services/schema.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  public options: IObject = {};

  constructor(private schemaSrv: SchemaService) {}

  ngOnInit() {
    combineLatest([this.schemaSrv.defaults$, this.schemaSrv.data$, this.schemaSrv.schema$])
      .pipe(tap(([defaults, data, schema]) => this.setCurrentOptions(defaults, data, schema)))
      .subscribe();
  }

  get isDefaultConfiguration(): boolean {
    return !Object.keys(this.options).length;
  }

  private setCurrentOptions(defaults: IObject, data: IObject, schema: IProperty) {
    const currentOptions = Object.entries(data).filter(([key, value]) => {
      return defaults[key] !== value;
    });

    this.options = currentOptions.length
      ? Object.fromEntries(
          currentOptions.map(([key, value]) => {
            // array values needs an special treatment
            if (value && typeof value === 'string' && schema[key].type === 'array') {
              value = value.split(',').map((chunk: string) => chunk.trim());
            }
            return [key, value];
          })
        )
      : {};
  }
}
