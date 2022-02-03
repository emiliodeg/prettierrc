import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { loadSchema } from './load-schema.function';
import { SchemaService } from './services/schema.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ComponentsModule, HttpClientModule],
  providers: [{ provide: APP_INITIALIZER, useFactory: loadSchema, deps: [SchemaService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
