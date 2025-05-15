'use client'
import React from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@heroui/react'
import Link from 'next/link'
import { useParams, useSelectedLayoutSegments } from 'next/navigation'


type bread = {
    breadcrumbs: {
    label: string
    segment: string | string[]
    nopage?: boolean
  }[]
}

const breadType:bread = {  
  breadcrumbs: [
    {
      label: 'Home',
      segment: 'home',
    },
    {
      label: 'Event',
      segment: 'events',
    },
  ],
}

const isSubset = (array1: string[], array2: string[]) =>
  array2.every((element) => array1.includes(element))

export default function BreadcrumbsSection() {
  const segments = useSelectedLayoutSegments()
  let segmentsWithParams = [...segments]
  const params = useParams()

  Object.keys(params).forEach((key) => {
    segmentsWithParams = segments.map((segment) => (segment === params[key] ? key : segment))
  })

  const currentPageBreadcrumbs = breadType.breadcrumbs.filter((item) => {
    if (segmentsWithParams.length === 0) return false

    if (typeof item.segment === 'string') {
      return segmentsWithParams.includes(item.segment)
    }

    return isSubset(item.segment, segmentsWithParams)
  })

  return (
    <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
      <BreadcrumbItem isCurrent={segments.length === 0}>
        <Link href='/'>Home</Link>
      </BreadcrumbItem>

      {currentPageBreadcrumbs.map((breadcrumb, index) => {
        const realUrl = `/${segments.slice(0, index + 2).join('/')}`

        return (
          <BreadcrumbItem key={breadcrumb.label} isDisabled={breadcrumb.nopage}>
            <Link href={breadcrumb.nopage ? '#' : realUrl}>{breadcrumb.label}</Link>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
}
