export interface Roles {
  id: number;
  roleName: string;
}

type RoleArray= Array<{id: number, roleName: string}>;

export const rolesArray: RoleArray = [
  { id: 1, roleName: "Super-admin" }, 
  { id: 2, roleName: "Admin" }, 
  { id: 3, roleName: "Employee" }
];
