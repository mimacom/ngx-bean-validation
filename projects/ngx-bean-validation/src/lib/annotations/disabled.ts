/* tslint:disable:variable-name */
import {checkAnnotationConflicts, FormMetadata, setName} from './common';

export const Disabled = (): any => (target: any, key: string) => {
  let metadata = Reflect.get(target, setName(key)) as FormMetadata;

  checkAnnotationConflicts(metadata, 'Disabled');

  metadata = metadata || {annotated: true};
  metadata.disabled = true;

  Reflect.set(target, setName(key), metadata);
};
