import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';

export type AnnotationFunction = (target: object, key: string) => void;

export interface FormMetadata {
  annotated: boolean;
  disabled?: boolean;
  syncValidators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  nestedArray?: boolean;
  nested?: boolean;
}

export const setName = (name: string): string => {
  return `__${name}__`;
};

export const getName = (name: string): string => {
  return name.replace(/^__(.+?)__$/, (substring, arg) => arg);
};

export const setSyncValidator = (target: any, key: string, validator: ValidatorFn): void => {
  let metadata = Reflect.get(target, setName(key)) as FormMetadata;

  checkAnnotationConflicts(metadata, 'Validator');

  metadata = metadata || {annotated: true};
  metadata.syncValidators = metadata.syncValidators || [];
  metadata.syncValidators.push(validator);

  Reflect.set(target, setName(key), metadata);
};

export const setAsyncValidator = (target: any, key: string, validator: AsyncValidatorFn): void => {
  let metadata = Reflect.get(target, setName(key)) as FormMetadata;

  checkAnnotationConflicts(metadata, 'Validator');

  metadata = metadata || {annotated: true};
  metadata.asyncValidators = metadata.asyncValidators || [];
  metadata.asyncValidators.push(validator);

  Reflect.set(target, setName(key), metadata);
};

export const checkAnnotationConflicts = (metadata: FormMetadata, annotation: string) => {
  if (metadata && metadata.nested) {
    throw new Error(`${annotation} has conflicts with Nested`);
  }
};
