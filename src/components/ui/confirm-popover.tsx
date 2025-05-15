'use client'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { ReactNode, useState } from 'react'

type Props = {
    children: ReactNode
    message?: ReactNode
    onConfirm: () => Promise<void>
}

export default function ConfirmPopover({ children, message, onConfirm }: Props) {
    // states
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <Popover
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
            isOpen={isOpen}
            showArrow
            placement='bottom'
        >
            <PopoverTrigger>{children}</PopoverTrigger>

            <PopoverContent className='p-1'>
                <div className='flex flex-col gap-4 p-2'>
                    <p>{message}</p>

                    <div className='flex items-center justify-end gap-2'>
                        <Button
                            onPress={() => {
                                setIsOpen(false)
                            }}
                            size='sm'
                            variant='light'
                            isDisabled={isLoading}
                        >
                            Cancel
                        </Button>

                        <Button
                            onPress={async () => {
                                setIsLoading(true)

                                await onConfirm()

                                setIsLoading(false)

                                setIsOpen(false)
                            }}
                            size='sm'
                            variant='solid'
                            color='danger'
                            isLoading={isLoading}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
