import { UserResponse } from "./user-response";

const mockUsers: UserResponse[] = [
  {
    id: "usr-001",
    user_id: "employee-001",
    role: [
      { 
        id: "rl-001", 
        level: 1, 
        name: "Super Admin", 
        alias: "superadmin", 
        active: true 
      },
      { 
        id: "rl-002", 
        level: 2, 
        name: "Admin", 
        alias: "admin", 
        active: true 
      }
    ],
    active_role_id: "rl-001",
    active_role: { 
      id: "rl-001", 
      level: 1, 
      name: "Super Admin", 
      alias: "superadmin", 
      active: true 
    },
    is_active: true,
    name: "Budi Santoso",
    email: "budi.santoso@company.com",
    phone: "+6281122334455",
    password: "$2a$10$examplehashedpassword",
    nip: "199001012020121001",
    is_user_usu: true,
    partner_id: "ptn-001"
  },
  {
    id: "usr-002",
    user_id: "employee-002",
    role: [
      { 
        id: "rl-003", 
        level: 3, 
        name: "Manager", 
        alias: "manager", 
        active: true 
      }
    ],
    active_role_id: "rl-003",
    active_role: { 
      id: "rl-003", 
      level: 3, 
      name: "Manager", 
      alias: "manager", 
      active: true 
    },
    is_active: true,
    name: "Ani Wijaya",
    email: "ani.wijaya@company.com",
    phone: "+6285566778899",
    nip: "198502052020122002",
    is_user_usu: false,
    partner_id: "ptn-002"
  },
  {
    id: "usr-003",
    role: [
      { 
        id: "rl-004", 
        level: 4, 
        name: "Staff", 
        alias: "staff", 
        active: true 
      },
      { 
        id: "rl-005", 
        level: 5, 
        name: "Guest", 
        alias: "guest", 
        active: false 
      }
    ],
    active_role_id: "rl-004",
    active_role: { 
      id: "rl-004", 
      level: 4, 
      name: "Staff", 
      alias: "staff", 
      active: true 
    },
    is_active: true,
    name: "Citra Dewi",
    phone: "+6289900112233",
    is_user_usu: true
  }
];

export default mockUsers;