import {Email} from './email';
import {RequiredTrue} from './required-true';
import {Max} from './max';
import {MaxLength} from './max-length';
import {Min} from './min';
import {Pattern} from './pattern';
import {Required} from './required';
import {MinLength} from './min-length';
import {AnnotationFunction} from './common';
import {NumberList} from './number-list';
import {NumberPattern} from './number-pattern';
import {DateAfter} from './date-after';
import {DateBefore} from './date-before';
import {DecimalNumber} from './decimal-number';
import {MaxDecimalPlaces} from './max-decimal-places';

describe('annotation validators', () => {
  /**
   * How to test annotations:
   * just put your annotation function into annotationsList and add values if need
   */
  const annotationsList = [
    {
      annotationFunc: Email,
      name: 'Email'
    },
    {
      annotationFunc: Max,
      values: [5],
      name: 'Max'
    },
    {
      annotationFunc: MaxLength,
      values: [5],
      name: 'MaxLength'
    },
    {
      annotationFunc: Min,
      values: [5],
      name: 'Min'
    },
    {
      annotationFunc: MinLength,
      values: [5],
      name: 'MinLength'
    },
    {
      annotationFunc: Pattern,
      values: ['.*'],
      name: 'Pattern'
    },
    {
      annotationFunc: Required,
      name: 'Required'
    },
    {
      annotationFunc: RequiredTrue,
      name: 'RequiredTrue'
    },
    {
      annotationFunc: NumberList,
      name: 'NumberList'
    },
    {
      annotationFunc: NumberPattern,
      name: 'NumberPattern'
    },
    {
      annotationFunc: DateAfter,
      values: [new Date()],
      name: 'DateAfter'
    },
    {
      annotationFunc: DateBefore,
      values: [new Date()],
      name: 'DateBefore'
    },
    {
      annotationFunc: DecimalNumber,
      name: 'DecimalNumber'
    },
    {
      annotationFunc: MaxDecimalPlaces,
      values: [2],
      name: 'MaxDecimalPlaces'
    }
  ];

  annotationsList.forEach((annotation: { annotationFunc: () => AnnotationFunction, values: any[], name: string }) => {
    describe(`${annotation.name}`, () => {

      it('should set reflect metadata for syncValidators', () => {
        class A {
        }

        annotation.annotationFunc()(A, 'propertyName');

        expect(Reflect.get(A, '__propertyName__')).toEqual({annotated: true, syncValidators: [jasmine.any(Function)]});
      });

      it('should be possible to add several validators', () => {
        class A {
        }

        Email()(A, 'propertyName');
        annotation.annotationFunc()(A, 'propertyName');

        expect(Reflect.get(A, '__propertyName__')).toEqual({
          annotated: true,
          syncValidators: [jasmine.any(Function), jasmine.any(Function)]
        });
      });
    });
  });
});
