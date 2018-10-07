/* tslint:disable*/
import {NestedArray} from './nested-array';
import {Nested} from './nested';

describe('annotation nestedArray', () => {
  it('should set reflect metadata for nestedArray annotation', () => {
    class A {
    }

    NestedArray()(A, 'propertyName');

    expect(Reflect.get(A, '__propertyName__')).toEqual({annotated: true, nestedArray: true});
  });

  it('should throw error', () => {
    class A {
    }

    Nested()(A, 'propertyName');

    expect(() => NestedArray()(A, 'propertyName')).toThrowError('Annotation NestedArray has conflict with Nested Annotation, please remove one of them');
  });
});
