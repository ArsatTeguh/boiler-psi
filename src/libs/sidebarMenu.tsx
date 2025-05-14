import { ChevronRight, ChevronLeft, HouseIcon } from 'lucide-react'

export  const menuItems = {
    visitor: [
        { name: 'Dashboard', path: '/visitor/dashboard' },
        { name: 'Profil', path: '/visitor/profile' },
    ],
    employee: [
        { name: 'Dashboard', path: '/employee/dashboard' },
        { name: 'Tugas', path: '/employee/tasks' },
        { name: 'Laporan', path: '/employee/reports' },
    ],
    developer: [
        { name: 'Dashboard', path: '/developer' },
        { name: 'Proyek', path: '/developer/projects' },
        { name: 'Bug Tracker', path: '/developer/bugs' },
        { name: 'API', path: '/developer/api' },
    ],
    admin: [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Pengguna', path: '/admin/users' },
        {
            name: 'Pengaturan', path: '/admin/setting',
            children: [
                { name: 'children2', path: '/admin/setting', },
                { name: 'children2', path: '/admin/status', },
            ]
        },
        {
            name: 'Audit Log', path: '/audit', icon: <HouseIcon className='w-4' />,
            children: [
                { name: 'children1', path: '/audit/log', icon: <HouseIcon className='w-4' />, },
                { name: 'children2', path: '/audit/data', icon: <HouseIcon className='w-4' />, },
            ]
        },
    ],
}