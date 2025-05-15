/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { JSX, Key, ReactNode, useCallback, useEffect, useState } from 'react'
import {
    addToast,
    Button,
    Chip,
    Spinner,
    Switch,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react'
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { globalStore } from '@/store/ui'
import { ApiResponse, EventResponse } from './apiResponse'
import ConfirmPopover from '../ui/confirm-popover'
import { error } from 'console'
import UTable from '../ui/table'
import EventsCategoriesModal from './modalsTable'
import { useFormik } from 'formik'
import FormInput from '../ui/input'
import { useDebounceValue } from 'usehooks-ts'

type Column = {
    key: string
    label: string
}

const columns: Column[] = [
    {
        key: 'no',
        label: 'No',
    },
    {
        key: 'event_name',
        label: 'Nama Event',
    },

    {
        key: 'pelaksanaan',
        label: 'Pelaksanaan',
    },

    {
        key: 'status',
        label: 'Status',
    },

    {
        key: 'actions',
        label: 'Aksi',
    },
]

type Props = {
    events: ApiResponse<EventResponse[]>
}

export default function EventsTable({ events }: Props): JSX.Element {
    // global states
    const { setOpenModal } = globalStore()


    // for rendering cell
    const renderCell = useCallback(
        (event: EventResponse, column_key: Key) => {
            const cellValue = event[column_key as keyof EventResponse]

            switch (column_key) {
                case 'no':
                    return <span className='text-sm'>{events.data!.indexOf(event) + 1}</span>

                case 'event_category':
                    return <span>{event.event_name || '-'}</span>

                case 'pelaksanaan':
                    return (
                        <div className='flex flex-col gap-1'>
                            <span>{event.contact_person_phone}</span>
                        </div>
                    )

                case 'status':
                    return (
                        <div className='flex flex-col gap-2'>
                            <Chip
                                classNames={{
                                    content: 'text-xs',
                                }}
                                color={event.status ? 'warning' : 'success'}
                                variant='flat'
                                size='sm'
                                radius='lg'
                            >
                                {event.status || '-'}
                            </Chip>
                        </div>
                    )

                case 'actions':
                    return (
                        <div className='flex items-center justify-end gap-2'>
                            <Button
                                className='icon-button bg-blue-500 text-white'
                                as={Link}
                                href={`/admin/managements/events/${event.id}`}
                                color='primary'
                                size='sm'
                                startContent={<EyeIcon className='w-4' />}
                                radius='lg'
                                isIconOnly
                            />

                            <Button
                                className='icon-button'
                                as={Link}
                                href={`/admin/managements/events/${event.id}/edit?step=basic`}
                                color='primary'
                                size='sm'
                                startContent={<PencilIcon className='w-4' />}
                                radius='lg'
                                isIconOnly
                            />

                            <ConfirmPopover
                                onConfirm={async () => {
                                    await handleDeleteEvent(event.id)
                                }}
                                message='Apakah kamu yakin ingin menghapus event ini?'
                            >
                                <Button
                                    className='icon-button text-white'
                                    color='danger'
                                    size='sm'
                                    startContent={<TrashIcon className='w-4' />}
                                    radius='lg'
                                    isIconOnly
                                />
                            </ConfirmPopover>
                        </div>
                    )
                default:
                    return cellValue || '-'
            }
        },
        [events],
    )
    // search params
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // search formik
// Modify the searchFormik configuration
const searchFormik = useFormik({
    initialValues: {
        searchTerm: searchParams.get('name') || '',
    },
    onSubmit: (values) => {
        updateSearchParams(values.searchTerm);
    },
});

//   const debouncedValue = useDebounceValue(searchFormik.values.searchTerm, 1500)

// Add this new function to handle search updates
// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setValue(value);
//     // updateSearchParams(debouncedValue);
// };

// Extract the search params update logic to a separate function
const updateSearchParams = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
        params.set('name', searchTerm);
    } else {
        params.delete('name');
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
};

// useEffect(() => {
// updateSearchParams(debouncedValue[0])
// },[searchFormik.values.searchTerm])

    // for deleting
    async function handleDeleteEvent(id: string) {
        const res = { error: false, message: 'Success' }

        if (res.error) {
            addToast({
                title: 'Delete Event',
                description: res.message || 'Something went wrong',
                color: 'danger',
            })
        }
    }

    function filteredData(data: EventResponse[], page: number, per_page: number) {
        const from = (page - 1) * per_page
        const to = page * per_page
        const name = searchParams.get('name')
        const category_id = searchParams.get('category_id')

        return data
            ?.filter((event: EventResponse) => {
                return (
                    (!name || event.event_name.toLowerCase().includes(name.toLowerCase())) &&
                    (!category_id || event.id === category_id)
                )
            })
            .slice(from, to)
    }

    function filteredDataLength(data: EventResponse[]): number {
        const name = searchParams.get('name')
        const category_id = searchParams.get('category_id')

        if (!name || !category_id) return data?.length

        return data.filter((event: EventResponse) => {
            return (
                event.event_name.toLowerCase().includes(name.toLowerCase()) &&
                event.id === category_id
            )
        })?.length
    }

    return (
        <div>
            <header className='mb-4 flex flex-col gap-4 lg:flex-row lg:justify-between'>
                <h2 className='text-lg font-medium'>Daftar Event</h2>

                <div className='flex flex-wrap items-center gap-3'>
                    <form className='flex-1 lg:w-64'>
                        <FormInput
                            formik={searchFormik}
                            name="searchTerm"
                            placeholder="Cari event..."
                            submitOnEnter={false}
                            startContent={<SearchIcon className="w-4 h-4 text-default-400" />}
                            className="w-full"
                            // onChange={handleSearchChange}
                        />
                    </form>
                    <Button
                        onPress={() => setOpenModal('add')}
                        className='flex-1 lg:flex-none'
                        color='primary'
                        size='sm'
                        radius='lg'
                        startContent={<PlusIcon className='w-4' />}
                    >
                        Tambah Event
                    </Button>
                </div>
            </header>

            <UTable
                aria-label='Student List table'
                bordered
                pagination={{
                    totalData: events?.data?.length || 0,
                    totalPage: Math.ceil(
                        filteredDataLength(events?.data as EventResponse[]) /
                        (Number(searchParams.get('per_page')) || 10),
                    ),
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align={column.key === 'actions' ? 'end' : 'start'}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody
                    items={
                        filteredData(
                            events?.data || [],
                            Number(searchParams.get('page')) || 1,
                            Number(searchParams.get('per_page')) || 10,
                        ) || ([] as EventResponse[])
                    }
                    emptyContent='No rows to display'
                    loadingContent={<Spinner />}
                    isLoading={false}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(column_key) => (
                                <TableCell>
                                    <span className='text-sm'>{renderCell(item, column_key) as ReactNode}</span>
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </UTable>

            {/* modal */}
            <EventsCategoriesModal />
        </div>
    )
}
