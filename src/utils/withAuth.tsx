import { redirect } from 'next/navigation'

export interface User {
  id: string
  email: string
  role: 'visitor' | 'employee' | 'admin' | 'developer'
  name: string
}

export const withAuth = (
  allowedRoles: User['role'][],
  Component: React.ComponentType,
  OnUnauthorized?: React.ComponentType
) => {
  return () => {
    // const token = cookies().get('token')?.value
    const user = { name: 'teguh', role: 'admin', id: '1', email: 'teguh' } as User

    if (!user) {
      redirect('/auth/login')
    }

    if (allowedRoles.includes(user.role)) {
      // if (OnUnauthorized) {
      //   return <OnUnauthorized />
      // }
      return <Component />

    }
    redirect('/not-access')

  }
}
