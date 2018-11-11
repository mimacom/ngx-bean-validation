import {Component} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {BeanFormGroup, Pattern, Email, MaxLength, RequiredTrue, MinLength, setSyncValidator, AnnotationFunction} from 'ngx-bean-validation';

const customRequired = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors => {
    if (control.valid) {
      const validationError = Validators.required(control);

      if (validationError) {
        return {
          required: 'Custom required'
        };
      }
    }

    return null;
  };
};

export const CustomRequired = (): AnnotationFunction => (target: object, key: string): void => {
  setSyncValidator(target, key, customRequired());
};

class User {
  @Email()
  email: string;

  @Pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
  @MaxLength(24)
  @MinLength(4)
  @CustomRequired()
  password: string;

  @RequiredTrue()
  checkbox: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  formGroup: FormGroup = new BeanFormGroup<User>(new User());

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get checkbox() {
    return this.formGroup.get('checkbox');
  }

  constructor() {
  }

  submit() {
    console.log(this.formGroup);
  }
}
