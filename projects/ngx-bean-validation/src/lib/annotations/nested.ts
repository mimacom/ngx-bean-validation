/* tslint:disable:variable-name */
import {FormMetadata, setName} from './common';

/**
 * Define nested groupControl
 *
 * Important notice:
 * should be only one nested annotation per class property
 *
 */
export const Nested = () => (target: object, key: string) => {
  let metadata = Reflect.get(target, setName(key)) as FormMetadata;

  if (metadata) {
    throw new Error('Annotation Nested has conflicts, please remove other annotations');
  }

  metadata = {annotated: true, nested: true};
  Reflect.set(target, setName(key), metadata);
};
