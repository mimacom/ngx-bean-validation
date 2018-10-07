import {Component} from '@angular/core';
import {NgxBeanValidationService} from '../../projects/ngx-bean-validation/src/lib/ngx-bean-validation.service';
import {FormGroup} from '@angular/forms';
import {Email} from '../../projects/ngx-bean-validation/src/lib/annotations/email';
import {Required} from '../../projects/ngx-bean-validation/src/lib/annotations/required';
import {RequiredTrue} from '../../projects/ngx-bean-validation/src/lib/annotations/required-true';
import {MinLength} from '../../projects/ngx-bean-validation/src/lib/annotations/min-length';
import {MaxLength} from '../../projects/ngx-bean-validation/src/lib/annotations/max-length';
import {Pattern} from '../../projects/ngx-bean-validation/src/lib/annotations/pattern';

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
  formGroup: FormGroup = this.ngxBeanValidationService.extractFromGroup(new User()).getGroup();

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get checkbox() {
    return this.formGroup.get('checkbox');
  }

  constructor(private ngxBeanValidationService: NgxBeanValidationService<any>) {
  }

  submit() {
    console.log(this.formGroup);
  }
}
