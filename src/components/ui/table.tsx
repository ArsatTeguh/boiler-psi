'use client'

import { Pagination, Select, SelectItem, Table, TableProps } from '@heroui/react'
import { cn } from '@heroui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useState } from 'react'

type Props = {
  isStriped?: boolean
  children?: ReactNode
  bordered?: boolean
  pagination?: {
    page?: number
    perPage?: number
    totalPage?: number
    totalData?: number
    onChangePage?: (page: number, perPage: number) => void
  }
} & TableProps

export default function UTable({ children, bordered, pagination, ...res }: Props) {
  // states
  const [page, setPage] = useState(pagination?.page || 1)
  const [perPage, setPerPage] = useState(pagination?.perPage || 10)

  // router
  const router = useRouter()

  // query params
  const searchParams = useSearchParams()

  // pathname
  const pathname = usePathname()

  return (
    <div>
      <Table
        classNames={{
          wrapper: 'border border-default-200 dark:border-zinc-700 p-0 shadow-none',
          th: 'first:rounded-none last:rounded-none !py-4 dark:bg-zinc-900',
          td: cn('first:before:rounded-none last:before:rounded-none !py-3 last:dark:bg-zinc-800', {
            'border-b border-default-200': bordered,
          }),
          table: 'dark:bg-zinc-800',
        }}
        {...res}
      >
        {children}
      </Table>

      {pagination && (
        <div className='flex items-center justify-end gap-4 p-4 pb-0'>
          <Pagination
            showControls
            color='primary'
            page={Number(searchParams.get('page')) || page}
            total={pagination?.totalPage || 0}
            onChange={(page) => {
              setPage(page)

              if (pagination?.onChangePage) {
                pagination.onChangePage(page, perPage)
              }

              router.push(`${pathname}?page=${page}&per_page=${perPage}`)
            }}
            variant='flat'
          />

          <Select
            onChange={(e) => {
              router.push(`${pathname}?page=${1}&per_page=${Number(e.target.value || 10)}`)

              setPerPage(Number(e.target.value || 10))
            }}
            classNames={{
              mainWrapper: 'shadow-none !h-9',
              trigger: 'h-9 min-h-9',
            }}
            disallowEmptySelection
            aria-labelledby='div'
            className='w-28'
            defaultSelectedKeys={[perPage.toString()]}
            variant='bordered'
          >
            <SelectItem key='10'>10 / page</SelectItem>

            <SelectItem key='20'>20 / page</SelectItem>

            <SelectItem key='50'>50 / page</SelectItem>

            <SelectItem key='100'>100 / page</SelectItem>
          </Select>

          <div className='flex items-center gap-2'>
            <div className='flex h-9 items-center rounded-md border border-default-200 px-2'>
              <span className='text-sm'>{pagination?.totalData || '-'}</span>
            </div>

            <span className='text-sm'>Total</span>
          </div>
        </div>
      )}
    </div>
  )
}
