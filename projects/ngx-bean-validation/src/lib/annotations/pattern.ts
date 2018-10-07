/* tslint:disable:variable-name */
import {AnnotationFunction, setSyncValidator} from './common';
import {Validators} from '@angular/forms';

export const Pattern = (pattern: string | RegExp): AnnotationFunction => (target: object, key: string): void => {
  setSyncValidator(target, key, Validators.pattern(pattern));
};
