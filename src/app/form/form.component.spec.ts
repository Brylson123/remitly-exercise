import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if the JSON input is valid', () => {
    const validJson = `{
    "PolicyName": "root",
    "PolicyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "IamListAccess",
                "Effect": "Allow",
                "Action": [
                    "iam:ListRoles",
                    "iam:ListUsers"
                ],
                "Resource": ""
            }
        ]
    }
}
`;
    expect(service.verifyIAMPolicy(validJson)).toBeTrue();
  });

  it('should return false if the JSON input is invalid', () => {
    const invalidJson = `{
    "PolicyName": "root",
    "PolicyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "IamListAccess",
                "Effect": "Allow",
                "Action": [
                    "iam:ListRoles",
                    "iam:ListUsers"
                ],
                "Resource": "*"
            }
        ]
    }
}
}`;
    expect(service.verifyIAMPolicy(invalidJson)).toBeFalse();
  });

  it('should return false if the JSON input is empty', () => {
    const emptyJson = '';
    expect(service.verifyIAMPolicy(emptyJson)).toBeFalse();
  });

  it('should return false if the JSON input is not valid JSON format', () => {
    const invalidFormatJson = 'invalid JSON format';
    expect(service.verifyIAMPolicy(invalidFormatJson)).toBeFalse();
  });
});
