/* tslint:disable:variable-name */
import {AnnotationFunction, checkAnnotationConflicts, FormMetadata, setName} from './common';

/**
 * If you don`t need to validate field, just use this annotation, otherwise you will not get formControl in ControlConfig
 * @returns {AnnotationFunction}
 * @constructor
 */
export const EmptyControl = (): AnnotationFunction => (target: any, key: string) => {
  let metadata = Reflect.get(target, setName(key)) as FormMetadata;

  checkAnnotationConflicts(metadata, 'EmptyControl');

  metadata = metadata || {annotated: true};
  Reflect.set(target, setName(key), metadata);
};
