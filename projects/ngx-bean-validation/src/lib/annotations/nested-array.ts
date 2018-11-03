/* tslint:disable:variable-name */
import {FormMetadata, setName} from './common';

/**
 * Define nested ArrayControl
 *
 */
export const NestedArray = () => (target: any, key: string) => {
  let metadata = Reflect.get(target, setName(key)) as FormMetadata;

  if (metadata && metadata.nested) {
    throw new Error('Annotation NestedArray has conflict with Nested Annotation, please remove one of them');
  }

  metadata = {annotated: true, nestedArray: true};
  Reflect.set(target, setName(key), metadata);
};
