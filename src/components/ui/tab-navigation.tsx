'use client'

import { cn } from '@heroui/react'

interface Tab {
  id: string
  label: string
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabNavigationProps) {
  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  return (
    <div
      className={cn(
        'flex border-b transition-colors duration-300 dark:border-neutral-700',
        className,
      )}
    >
      {tabs?.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'px-4 py-2 transition-colors duration-300',
            activeTab === tab.id
              ? 'border-b-2 border-green-500 font-medium dark:border-green-400 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
