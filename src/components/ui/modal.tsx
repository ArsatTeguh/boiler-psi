import { JSX, ReactNode } from 'react'
import { Modal, ModalProps } from '@heroui/react'

type Props = {
  children: ReactNode
} & ModalProps

export default function UModal({ children, ...props }: Props): JSX.Element {
  return (
    <>
      <Modal
        classNames={{
          base: 'dark:bg-zinc-800 overflow-hidden',
          footer: 'bg-neutral-50 dark:bg-zinc-900/50',
        }}
        backdrop='blur'
        scrollBehavior='inside'
        {...props}
      >
        {children}
      </Modal>
    </>
  )
}
