# NgxBeanValidation

> Idea was taken from [Bean Validation](https://beanvalidation.org/)

## What is the problem?

Reactive forms are very powerful, but they become painful for big forms:
```typescript
class Component {
  private userForm: FormGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      age: ['', Validators.compose([Validators.number, Validators.min(18), Validators.max(60)])],
      creditCards: [{
          cardNumber: ['', Validators.compose(Validators.isCreditCard, Validators.isMasterCard)],
          date: ['', Validators.compose([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)])],
          cvv: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3,4}$/)])]
      }],
      address: {
          addressLine1: ['', Validators.required],
          addressLine2: '',
          city: ['', Validators.required],
          region: ['', Validators.required],
          zip: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)])],
          country: ['', Validators.required]
      },
      deliveryDate: ['', Validators.compose([Validators.required, Validators.isDate, Validators.dateBefore(someValue), Validators.dateAfter(someValue)])]
  });
}
```

instead of this huge unreadable peace of code, I recommend using Bean Validation approach
```typescript
class User {
    @Email()
    @Required()
    email: string;
 
    @MaxLength(40)
    @MinLength(3)
    @Required()
    name: string;
 
    @Max(60)
    @Min(18)
    @Number()
    @Required()
    age: number;
 
    @NestedArray()
    creditCards: CreditCard[] = [new CreditCard()];
 
    @Nested()
    address: Address = new Address();
 
    @DateAfter(new Date())
    @DateBefore(new Date())
    @IsDate()
    @Required()
    deliveryDate: string;
}
 
class CreditCard {
    @IsMasterCard()
    @IsCreditCard()
    @Required()
    cardNumber: string;
 
    @Pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
    @Required()
    date: string;
 
    @Pattern(/^[0-9]{3,4}$/)
    @Required()
    cvv: string;
}
 
class Address {
    @Required()
    addressLine1: string;
 
    @EmptyControl()
    @Required()
    addressLine2: string;
 
    @Required()
    city: string;
 
    @Required()
    region: string;
 
    @Pattern(/^\d{5}(?:[-\s]\d{4})?$/)
    @Required()
    zip: string;
 
    @Required()
    country: string;
}

class Component {
  private userForm: FormGroup = new BeanFormGroup<User>(new User());
}
``` 

Now we can use our classes as interface and reuse them for reactive forms.

## Contains:

This library provides `BeanFormGroup` class for creation `FormGroup` from annotated classes.

### Annotations for default angular validators:
* Max
* MaxLength
* Min
* MinLength
* Required
* RequiredTrue
* Pattern

### Annotation for empty form control:
* EmptyControl

### Annotation for nested FormGroup and FormArray:
* Nested
* NestedArray

### Annotation for disabling form control:
* Disabled

### Function that helps you create your own validator annotation:
* setSyncValidator

## How to use:
Example how to create your own validator annotation:
```typescript
export const CustomValidator = (someValue: any): AnnotationFunction => (target: object, key: string): void => {
  setSyncValidator(target, key, customAngularValidator(someValue));
};
```

Now you can put it in your class:
```typescript
class User {
  @CustomValidator('someValue')
  name: string
}
```

And create form group:
```typescript
class Component {
  userForm: FromGroup = new BeanFormGroup(new User())
}
```

## Does`t support
* Async validators
* FormControl and FormArray them self, only inside FormGroup

## Contribution
Are very welcome! Please share your ideas and improvements.
