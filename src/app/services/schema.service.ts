import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

export interface IProperty {
  [key: string]: {
    default: string | number | boolean;
    type: string;
    description: string;
    options?: IObject;
  };
}

export interface IObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  data$: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({});
  schema$: BehaviorSubject<IProperty> = new BehaviorSubject<IProperty>({});
  defaults$: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({});
  loading$: any;

  constructor(private http: HttpClient) {}

  public loadSchema(): any {
    return this.http.get('https://json.schemastore.org/prettierrc').pipe(
      tap((response: any) => {
        this.processProperties(response?.definitions?.optionsDefinition?.properties);
      })
    );
  }

  private processProperties(rawOptions: any): void {
    if (rawOptions == null) {
      return;
    }

    const properties: { [key: string]: any } = {};
    const defaults: IObject = {};

    for (const key in rawOptions) {
      if (Object.prototype.hasOwnProperty.call(rawOptions, key)) {
        const element = rawOptions[key];

        if (element.type === 'array') {
          element.description += ' Use values separated by commas';
        }

        if (!!element?.oneOf || !!element?.anyOf) {
          const list = element.oneOf || element.anyOf;

          element.type = 'radio';
          element.options = Object.fromEntries(
            list
              .filter((option: { enum?: [] }) => !!option?.enum)
              .map((option: { enum: string[]; description: string }) => {
                return [option.enum[0], option.description];
              })
          );

          if (Object.keys(element.options).length > 4) {
            element.type = 'select';
          }

          delete element.oneOf;
          delete element.anyOf;
        }

        properties[key] = element;
        defaults[key] = element.default ?? '';
      }
    }

    this.schema$.next(properties);
    this.defaults$.next(defaults);
  }
}
