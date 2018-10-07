/* tslint:disable:variable-name */
import {AnnotationFunction, setSyncValidator} from './common';
import {Validators} from '@angular/forms';

export const Required = (): AnnotationFunction => (target: object, key: string): void => {
  setSyncValidator(target, key, Validators.required);
};
