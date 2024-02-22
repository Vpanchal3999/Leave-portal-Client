export class Common {
    public baseUrl = "http://localhost:8080/api/v1";
    public authUrl = "/auth";
    public adminUrl = "/admin";
    public login = "/login";
    public employeeUrl = "/employee";
    public registerEmployeeUrl = "/registerEmployee";
    public getAllEmployeeDetailsUrl = "/getAllEmployee";
    public getEmployeeDetailsByIdUrl = "/{empCode}";
    public applyLeaveForEmployeeUrl = "/applyLeave";
    public updateEmployeeDetailsUrl = "/updateEmployee";
    public updateLeaveStatusUrl = "/updateLeave/status";
    public listOfEmployeeOnLeaveUrl = "/leaveList";
    public listOfAllDesignationUrl = "/listDesignation";
    public changePasswordUrl = "/changePassword";
    public forgotPasswordUrl = "/forgotPassword";
    public refreshToken = "/refreshToken";
    public appliedLeavesByEmployee = "/leaveDetails"
    public activeEmployee="/active"
    public deActiveEmployee="/delete"
 
}