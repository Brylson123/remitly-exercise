import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        this.answer = this.FormService.verifyIAMPolicy(fileData);
      };
      reader.readAsText(this.selectedFile);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
