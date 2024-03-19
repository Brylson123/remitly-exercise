import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormService} from "./form.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  myForm: FormGroup;
  selectedFile: File;
  answer: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private FormService: FormService
  ) {
    this.myForm = this.formBuilder.group({
      jsonData: ['']
    });
  }

  onSubmit() {
    const jsonData = this.myForm.get('jsonData').value;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        console.log('Uploaded File:', fileData);
        const isValid = this.FormService.verifyIAMPolicy(fileData);
        console.log('Is valid IAM policy:', isValid);
        this.answer = isValid;
      };
      reader.readAsText(this.selectedFile);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    event.target.value = '';
  }
}
