import {Disabled} from './disabled';

describe('annotation disabled', () => {
  it('should set reflect metadata for syncValidators', () => {
    class A {
    }

    Disabled()(A, 'propertyName');

    expect(Reflect.get(A, '__propertyName__')).toEqual({annotated: true, disabled: true});
  });
});
