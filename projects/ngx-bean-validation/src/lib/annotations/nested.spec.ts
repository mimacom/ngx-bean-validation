/* tslint:disable*/
import {Nested} from './nested';
import {NestedArray} from './nested-array';

describe('annotation nested', () => {
  it('should set reflect metadata for nested annotation', () => {
    class A {
    }

    Nested()(A, 'propertyName');

    expect(Reflect.get(A, '__propertyName__')).toEqual({annotated: true, nested: true});
  });

  it('should throw error', () => {
    class A {
    }

    NestedArray()(A, 'propertyName');

    expect(() => Nested()(A, 'propertyName')).toThrowError('Annotation Nested has conflicts, please remove other annotations');
  });
});
