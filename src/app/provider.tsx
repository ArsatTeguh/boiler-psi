'use client'
import { addToast, HeroUIProvider, ToastProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SWRConfig } from 'swr'
import { fetchAPI } from '../../config/fetch-api'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider locale='en-ID' >
      <NextThemesProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
        <ToastProvider
          toastProps={{
            variant: 'flat',
            radius: 'md',
            timeout: 2000,
          }}
        />

        <SWRConfig
          value={{
            fetcher: async (resource) => {
              const res = await fetchAPI({
                endpoint: resource,
              })

              if (res.error) throw res

              return res
            },
            onError: (error) => {
              addToast({
                title: 'Oops! An error occurred',
                description: error?.message || 'Something went wrong',
                color: 'danger',
              })
            },
            revalidateOnFocus: false,
            refreshWhenHidden: false,
            refreshInterval: 0,
            shouldRetryOnError: false,
          }}
        >
          {children}
        </SWRConfig>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
