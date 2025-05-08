export interface UserResponse {
  user_id?: string;
  id: string;
  role: Role[];
  active_role_id: string;
  active_role: Role;
  is_active: boolean;
  name: string;
  email?: string;
  phone?: string;
  password?: string;
  nip?: string;
  is_user_usu?: boolean;
  partner_id?: string;
}

export interface PartnerUserResponse {
  role: Role[];
  active_role_id: string;
  id: string;
  partner_id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  is_active: boolean;
}

export interface VolunteerResponse {
  role: Role[];
  active_role_id: string;
  id: string;
  is_user_usu: boolean;
  email: string;
  name: string;
  phone: string;
  password: string;
  is_active: boolean;
}

export interface Role {
  id: string;
  level: number;
  name: string;
  alias: string;
  active: boolean;
}

export interface UsuEmployeeResponse {
  id: string;
  front_degree: string;
  full_name: string;
  behind_degree: string;
  nip: string;
  nidn: string;
  email: string;
  work_unit_id: string;
  work_unit: string;
  study_program: string;
  photo: string;
  npwp: string;
  type: string;
  type_str: string;
  status: string;
  rank: Rank;
}

export interface MeParticipant {
  identity_type: string;
  occupation: string;
  phone: string;
  photo_url: string;
  id: string;
  full_name: string;
  type: string;
  identity: string;
  institution: string;
  gender: string;
  email: string;
  password: string;
  has_agreed_to_terms_of_use: boolean;
  consent_to_emails: boolean;
  error?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Rank {}
