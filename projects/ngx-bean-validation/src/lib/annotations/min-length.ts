/* tslint:disable:variable-name */
import {setSyncValidator} from './common';
import {Validators} from '@angular/forms';

export const MinLength = (minLength: number): any => (target: any, key: string) => {
  setSyncValidator(target, key, Validators.minLength(minLength));
};
