export default interface SsoResponse {
  email: string;
  emailUsu: string;
  exp: number;
  iat: number;
  identity: string;
  iss: string;
  loggedInAs: number;
  name: string;
  userId: string;
  userUnit: UserUnit;
  detail: UserDetail;
}

export interface UserDetail {
  objectId: string;
  id: string;
  name: string;
  photo: string;
  roleId: string;
  unitDataRoles: UnitDataRole[];
  role: string;
  token: string;
  roleList: RoleList[];
  workUnitId: string;
  workUnitName: string;
}

interface RoleList {
  roleId: string;
  roleName: string;
  units: UnitDataRole[];
  active: boolean;
}

interface UnitDataRole {
  unitId: string;
  unitName: string;
}

interface UserUnit {
  altId?: unknown;
  code?: unknown;
  photo: string;
  simsdmCode: string;
  unitId: number;
}
