import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {
  }

  verifyIAMPolicy(inputJson: string): boolean {
    let jsonData: any;

    try {
      jsonData = JSON.parse(inputJson);
    } catch (error) {
      console.error('Invalid JSON format:', error);
      return false;
    }

    if (!jsonData.PolicyDocument || !jsonData.PolicyDocument.Statement || !Array.isArray(jsonData.PolicyDocument.Statement)) {
      console.error('Invalid IAM Policy JSON format.');
      return false;
    }

    for (const statement of jsonData.PolicyDocument.Statement) {
      if (statement.Resource === undefined) {
        console.error('Resource field is missing in statement:', statement);
        return false;
      }
      if (typeof statement.Resource === 'string' && statement.Resource.trim() === '*') {
        return false;
      }
      if (Array.isArray(statement.Resource) && statement.Resource.includes('*')) {
        return false;
      }
    }
    return true;
  }
}
