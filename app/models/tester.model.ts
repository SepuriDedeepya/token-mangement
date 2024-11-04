export interface Tester {
  employeeId: number;
  employeeName: string;
  employeeDesignation: string;
  employeePassword: string;
  employeePhoneno: number; // Consider using a string if phone numbers can have leading zeros
  employeeEmail: string;
  isEmployeeAvailable: boolean;

}

// constructor(
//   employeeId: number,
//   employeeName: string,
//   employeeDesignation: string,
//   employeePassword: string,
//   employeePhoneno: number,
//   employeeEmail: string,
//   isEmployeeAvailable: boolean
// ) {
//   this.employeeId = employeeId;
//   this.employeeName = employeeName;
//   this.employeeDesignation = employeeDesignation;
//   this.employeePassword = employeePassword;
//   this.employeePhoneno = employeePhoneno;
//   this.employeeEmail = employeeEmail;
//   this.isEmployeeAvailable = isEmployeeAvailable;
// }