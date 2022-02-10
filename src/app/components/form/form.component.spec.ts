import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;

  beforeEach(() => {
    component = new FormComponent({} as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
