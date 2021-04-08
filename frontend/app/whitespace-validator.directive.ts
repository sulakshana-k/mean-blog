import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appWhitespaceValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WhitespaceValidatorDirective, multi: true}]
})

export class WhitespaceValidatorDirective
{
  constructor() {}

  // 'validate':- belongs to NG_VALIDATORS and has to be reimplemented.

  //https://angular.io/api/forms/ValidationErrors

  // 'ValidationErrors':- This function returns '[key: string]: any;' i.e. ValidationErrors.
  // 'any':- https://www.typescriptlang.org/docs/handbook/basic-types.html#any
  //         This is required when we can't decide the type of the variable because it is
  //         dynamic.
  validate( control: AbstractControl ) : { [key: string]: any }
  {
    // --- This gives the actual data stored in 'control'.
    //console.log("control.value A : ", control.value)
    // --- This gives the result as true and false depending on whether there is some data
    // --- in 'control' or not.
    //console.log("control.value B : ", !control.value)

    // 'startsWith' and 'endsWith' is Javascript.
    // We get some input data from 'control.value' and then apply Javascript functions
    // on it.

    // https://angular.io/api/forms/AbstractControl#value
    const isValid = ( !control.value.startsWith(' ') && !control.value.endsWith(' ') );

    // This kind of 'if' statement returns null if the input is valid, and returns
    // 'isWhitespace' is true if the input contains whitespace in begining or end.

    // If input is valid then no action is required, hence it is okay to return null.
    return isValid ? null : { 'isWhitespace': true };
  }
}

