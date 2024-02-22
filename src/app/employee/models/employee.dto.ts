export class EmployeeResponse {
    id?: number;
    employeeCode?: string;
    firstName?: string;
    lastName?: string;
    designationName?: string;;
    departmentCode?: string;
    departmentName?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    contactNumber?: number;
    age?: number;
    email?: string;
    roles?: object;
    isActive?: boolean;
    token?: string;
    createdAt?: Date;
    createdBy?: string;
    modifyAt?: Date;
    modifyBy?: string;

}

export class EmployeeRegistrationRequest {
    employeeCode?: string;
    firstName?: string;
    lastName?: string;
    designationId?: number;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    contactNumber?: number;
    age?: number;
    email?: string;
    roleId?: number;
    password?: string;
}

export class EmployeeUpdateRequest {
    firstName?: string;
    lastName?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    contactNumber?: number;
    age?: number;
    email?: string;
}

export interface Designation {
    id: number;
    designationName: string;
  }