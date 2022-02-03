import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { GeneratorComponent } from './generator/generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [FormComponent, GeneratorComponent, AboutComponent, FooterComponent, HeaderComponent],
  exports: [FormComponent, GeneratorComponent, AboutComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ComponentsModule {}
