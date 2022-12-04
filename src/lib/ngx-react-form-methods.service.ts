import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormGeneratorService } from 'projects/ngx-form-generator/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class NgxReactFormMethodsService {
  public form: FormGroup = this.fb.group({ all: this.fb.group({}) });

  constructor(
    public fb: FormBuilder,
    public formGeneratorService: FormGeneratorService,
  ) {
  }


  public generateForm(formData: any) {
    this.form.addControl('all', this.formGeneratorService.run(formData));
  }

  public getArray(path: string): FormArray {
    return this.form.get(path) as FormArray;
  };

  public getControl(path: string): FormControl {
    return this.form?.get(path) as FormControl;
  };

  public findControl(entityName: string, id: any, path?: string): FormControl {
    const fg = this.getArray('all.' + entityName).controls
      .find(control => control.value.id === id);
    return (path ? fg?.get(path) as FormGroup : fg) as FormControl;
  }

  public getGroup(path: string): FormGroup {
    return this.form?.get(path) as FormGroup;
  };
}
