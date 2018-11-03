import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Email} from '../../projects/ngx-bean-validation/src/lib/annotations/email';
import {MaxLength, MinLength, Required, RequiredTrue} from '../../projects/ngx-bean-validation/src/lib/annotations';
import {Pattern} from '../../projects/ngx-bean-validation/src/lib/annotations/pattern';
import {BeanFormGroup} from '../../projects/ngx-bean-validation/src/lib/bean-form-group';

class User {
  @Email()
  email: string;

  @Pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
  @MaxLength(24)
  @MinLength(4)
  @Required()
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
