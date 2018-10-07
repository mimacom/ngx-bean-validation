import {checkAnnotationConflicts, getName, setAsyncValidator, setName, setSyncValidator} from './common';
import {AbstractControl} from '@angular/forms';
import {of} from 'rxjs';

describe('common annotation methods', () => {
  it('should set new metadata name', () => {
    expect(setName('name')).toBe('__name__');
  });

  it('should get origin name', () => {
    expect(getName('__name__')).toBe('name');
  });

  it('should set reflect metadata for syncValidators', () => {
    class A {
    }

    const validator = (c: AbstractControl) => () => {
    };
    setSyncValidator(A, 'propertyName', validator);

    expect(Reflect.get(A, '__propertyName__')).toEqual({annotated: true, syncValidators: [validator]});
  });

  it('should set reflect metadata for asyncValidators', () => {
    class A {
    }

    const asyncValidator = (c: AbstractControl) => of(null);
    setAsyncValidator(A, 'propertyName', asyncValidator);

    expect(Reflect.get(A, '__propertyName__')).toEqual({annotated: true, asyncValidators: [asyncValidator]});
  });

  it('should throw error', () => {
    expect(() => checkAnnotationConflicts({annotated: true, nested: true}, 'some')).toThrowError('some has conflicts with Nested');
  });

  it('should not throw error', () => {
    expect(checkAnnotationConflicts({annotated: true, nested: undefined}, 'some')).toBeUndefined();
  });
});
