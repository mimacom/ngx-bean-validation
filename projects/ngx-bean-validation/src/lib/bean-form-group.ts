import {AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {getName} from './annotations/common';
import 'proxy-polyfil';

export class BeanFormGroup<T> extends FormGroup {
  constructor(annotatedInstance: T) {
    super(BeanFormGroup.generateAbstractControls<T>(annotatedInstance));
  }

  public static generateAbstractControls<T>(annotatedInstance: T): ControlConfig {
    const controls = new Proxy(annotatedInstance, {
      get: (target: any, name: any): any => {
        return name in target ? Reflect.get(target, name) : undefined;
      }
    });

    const newControls: { [key: string]: AbstractControl } = {};
    for (const prop in controls) {
      if (controls[prop] instanceof Object && controls[prop].annotated) {
        const metadata = controls[prop];
        const controlName = getName(prop);

        if (metadata.nested) {
          newControls[controlName] = new FormGroup(this.generateAbstractControls(controls[controlName]));
          continue;
        }

        const syncValidators: ValidatorFn = exposeSyncValidators(metadata);
        const asyncValidators: AsyncValidatorFn = exposeAsyncValidators(metadata);

        if (metadata.nestedArray) {
          const arrayForm = controls[controlName].map((control: any) => new FormGroup((this.generateAbstractControls(control))));

          newControls[controlName] = new FormArray(arrayForm, syncValidators, asyncValidators);
          continue;
        }

        newControls[controlName] = new FormControl({
          value: controls[controlName],
          disabled: metadata.disabled
        }, syncValidators, asyncValidators);
      }
    }

    return newControls;
  }
}

export interface ControlConfig {
  [key: string]: any;
}

function exposeSyncValidators(metadata): ValidatorFn {
  if (metadata.syncValidators) {
    return Validators.compose(metadata.syncValidators);
  }
}

function exposeAsyncValidators(metadata): AsyncValidatorFn {
  if (metadata.asyncValidators) {
    return Validators.composeAsync(metadata.asyncValidators);
  }
}
