import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {getName} from './annotations/common';

/**
 * Factory that can generate control config from annotated class
 */
@Injectable()
export class NgxBeanValidationService<T> {
  private formGroup: FormGroup;

  /**
   * Important Notice:
   * All fields in your class should be annotated, otherwise you will not get them in ControlConfig
   * For not validated field use annotation: EmptyControl
   *
   * @param {T} annotatedInstance
   * @returns {ControlConfig}
   */
  public extractFromGroup(annotatedInstance: T): NgxBeanValidationService<T> {
    this.formGroup = new FormGroup(this.generateAbstractControls(annotatedInstance));

    return this;
  }

  public getGroup(): FormGroup {
    return this.formGroup;
  }

  public getControl(controlName: string): AbstractControl {
    return this.formGroup.get(controlName);
  }

  private generateAbstractControls(annotatedInstance: T): ControlConfig {
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

        let syncValidators: ValidatorFn;
        let asyncValidators: AsyncValidatorFn;
        if (metadata.syncValidators) {
          syncValidators = Validators.compose(metadata.syncValidators);
        }

        if (metadata.asyncValidators) {
          asyncValidators = Validators.composeAsync(metadata.asyncValidators);
        }

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

    this.formGroup = new FormGroup(newControls);
    return newControls;
  }
}

interface ControlConfig {
  [key: string]: any;
}
