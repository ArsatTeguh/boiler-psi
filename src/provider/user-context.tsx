'use client'

import ApiResponse from '@/interfaces/api-response'
import { UserResponse } from '@/interfaces/user/user-response'
import { ReactNode, createContext } from 'react'

export const UserContext = createContext<ApiResponse<UserResponse> | null>(null)

type Props = {
  children?: ReactNode
  user: ApiResponse<UserResponse> | null
}

export default function UserProvider({ children, user }: Props) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
