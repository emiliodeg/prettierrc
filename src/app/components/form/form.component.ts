import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { IProperty, SchemaService } from 'src/app/services/schema.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({});

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private schemaSrv: SchemaService) {}

  ngOnInit() {
    this.schemaSrv.schema$
      .pipe(
        tap((response) => this.initForm(response)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get schema(): IProperty {
    return this.schemaSrv.schema$.value;
  }

  private initForm(properties: IProperty): void {
    Object.entries(properties).forEach(([key, value]) => {
      this.form.addControl(key, new FormControl(value.default ?? ''));
    });

    this.form.valueChanges
      .pipe(
        tap((values) => {
          this.schemaSrv.data$.next(values);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
}
