import { AbstractControl } from "@angular/forms";

export function nameValidator() {
  return (control: AbstractControl) => {
    if (!control.value) {
      return { required: 'Name is required' };
    }
    if (control.value.length < 3 || control.value.length > 100) {
      return { length: 'Name must be between 3 and 100 characters' };
    }
    return null;
  };
}
