
export class LeaveRequest {
    leaveId ?: number
    employeeCode ?: string
    leaveType ?: string
    fromDate ?: Date
    toDate ?: Date
    remark ?: string
    status ?: string
}

export class LeaveRejectRequest {
    leaveId ?: number
    employeeCode ?: string
    status ?: string
    rejectReason?: string
}

export class LeaveResponse {

    leaveId ?: number
    employeeCode ?: string
    firstName ?: string
    lastName ?: string
    designationName?: string
    leaveType ?: string
    fromDate ?: Date
    toDate ?: Date
    remark ?: string
    status ?: string
    statusMessage ?: string
    messageShow ?: boolean
}

export class LeaveAudit {
    employeeCode?: number;
    firstName?: String;
    lastName?: String;
    designationName?: String;
    remark?: String;
    status?: String;
    leaveDate?: Date;
}

export class LeaveType {
    id ?: number
    leaveTypeName ?: string
    leaveTypeValue ?: string
}