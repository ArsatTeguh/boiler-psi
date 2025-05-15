import { JSX, useState } from 'react'
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  addToast,
} from '@heroui/react'

import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { globalStore } from '@/store/ui'
import UModal from '../ui/modal'

export default function EventsCategoriesModal(): JSX.Element {
  // global states
  const { openModal, setOpenModal } = globalStore()

  // states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedEventCategoryId, setSelectedEventCategoryId] = useState<string>('')

  // router
  const router = useRouter()

  // fetch event categories using swr


  // for handling create event
  async function handleCreateEvent() {

    addToast({
      title: 'Create Event',
      description: 'Success',
      color: 'success',
    })

    setIsSubmitting(false)

    setOpenModal('')
  }

  return (
    <>
      <UModal
        isOpen={
          openModal === 'add'|| openModal === 'update'
        }
        onOpenChange={() => {
          setSelectedEventCategoryId('')

          setOpenModal('')
        }}
      >
        <ModalContent className='overflow-hidden'>
          {(close) => (
            <>
              <ModalHeader></ModalHeader>

              <ModalBody className='pb-4'>
                <div className='mx-auto w-full max-w-md space-y-4'>
                  <h2 className='apply-dark-mode-text text-center text-xl font-semibold'>
                    Pilih Kategori Event
                  </h2>

                  <hr className='apply-dark' />

         
                    {/* <div className='flex justify-center p-4'>
                      <Spinner />
                    </div> */}
          
                    <div className='space-y-2'>
                
                    </div>
          
                </div>
              </ModalBody>

              <ModalFooter>
                <Button onPress={close} variant='bordered' size='sm'>
                  Batal
                </Button>

                <Button
                  onPress={handleCreateEvent}
                  type='submit'
                  form='ticket-form'
                  color='primary'
                  size='sm'
                  isDisabled={!selectedEventCategoryId}
                  isLoading={isSubmitting}
                >
                  Selanjutnya
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </UModal>
    </>
  )
}
