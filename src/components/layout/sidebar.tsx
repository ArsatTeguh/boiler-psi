'use client'
import { Accordion, AccordionItem, Button, cn } from '@heroui/react'
import { ChevronRight, ChevronLeft, HouseIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import LoadingPAge from './loading'
import { menuItems } from '@/libs/sidebarMenu'

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [isSidebar, setIsSidebar] = useState(true)
    
    const menuRoles = menuItems['admin']
    
    const pathname = usePathname()
    const currentPath = !pathname.split('/')[2] ? pathname.split('/')[1] : pathname.split('/')[2]

    const isActive = (path: string) => {
        const targetPath = !path.split('/')[2] ? path.split('/')[1] : path.split('/')[2]
        return currentPath === targetPath
    }

    return (
        <div className="">
            <aside
                className={`${isSidebar ? 'translate-x-0' : 'lg:-translate-x-48 -translate-x-full'} fixed inset-y-0 left-0 z-50 flex w-[calc(100%-6rem)] flex-col items-center gap-y-8 bg-white px-2 py-4 duration-200 ease-in-out transition-all  dark:bg-zinc-800 md:w-64  `}
            >
                <div className={`w-full pt-2 pb-5 flex flex-col  gap-4`}>
                    <div className={` relative flex w-full`}>
                        <p className={`font-semibold ${!isSidebar && 'hidden'}`}>LOGO LOREM</p>
                     <div className={`absolute right-0 top-0 transition-all ease-in-out duration-300 ${!isSidebar && 'right-[.5rem] rotate-180'}`}>
                           <Button
                            onPress={() => setIsSidebar(e => !e)}
                            className='rounded-full'
                            variant='solid'
                            color='primary'
                            size='sm'
                            startContent={<ChevronLeft />}
                            isIconOnly
                        >
                        </Button>
                     </div>
                    </div>
                    <div className={`${!isSidebar && 'hidden'}`}>
                        <p> Yourname</p>
                        <p> 1221434242342</p>
                    </div>

                </div>
                <div className={`w-[95%] relative h-full overflow-y-auto `}>

                    <ul className={`space-y-4 ${!isSidebar && 'hidden'}`}>
                        {menuRoles.map((val, index) => {
                            return (
                                <li key={index}>
                                    {val.children ? (
                                        <Accordion

                                            key={index}
                                            showDivider={false}
                                            className='p-0 '
                                            // defaultSelectedKeys={
                                            //     pathname.slice(1).startsWith(val.path) ? [val.path] : []
                                            // }
                                            itemClasses={{
                                                base: 'ml-2',
                                                trigger: cn(
                                                    'w-full rounded-md !no-underline  p-2 hover:bg-primary/20 dark:hover:bg-zinc-700 h-10 gap-2 ',
                                                ),
                                                indicator: `mr-2 -rotate-180 ${val.path.split('/')[2] === currentPath ? 'text-primary font-bold' : 'text-black'}`,
                                                title: cn('pr-2 font-semibold text-sm', {
                                                    'dark:text-zinc-400': isActive(val.path),
                                                }),
                                                startContent: cn({
                                                    'dark:text-zinc-400': isActive(val.path),
                                                }),
                                            }}
                                        >
                                            <AccordionItem
                                                classNames={{
                                                    title: `text-sm  font-normal ${val.path.split('/')[2] === currentPath ? 'text-primary font-bold' : 'text-black'}`,
                                                    base: 'p-0',
                                                    content: 'pl-2',
                                                }}
                                                key={val.path}
                                                aria-label={val.name}
                                                startContent={val.icon}
                                                indicator={<ChevronRight className='w-5 rotate-180' />}
                                                title={val.name}
                                            >
                                                {val.children.map(
                                                    (child: any, index: number) => (

                                                        <Button
                                                            key={index}
                                                            // onPress={() => setIsSidebarOpen(false)}
                                                            className={`${isActive(child.path) ? 'w-full  bg-primary/20 font-bold text-primary' : 'hover:bg-light/10 text-black'} w-full flex  items-center justify-start gap-2 my-1 duration-150 dark:text-zinc-200`}
                                                            as={Link}
                                                            variant='light'
                                                            color='primary'
                                                            href={child.path}
                                                            startContent={child?.icon}
                                                        >
                                                            {child.name}
                                                        </Button>
                                                    ),
                                                )}
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (

                                        <Button
                                            key={index}
                                            // onPress={() => setIsSidebarOpen(false)}
                                            // border-r-4
                                            className={`${isActive(val.path) ? 'w-full  bg-primary/20 font-bold text-primary' : 'hover:bg-light/10 text-black'} w-full flex  items-center justify-start gap-2 p-2 duration-150 dark:text-zinc-200`}
                                            as={Link}
                                            variant='light'
                                            color='primary'
                                            href={val.path}
                                        // startContent={val.icon}
                                        >
                                            {val.name}
                                        </Button>

                                    )}
                                </li>
                            )
                        })}

                    </ul>
                </div>
                <div className="w-full pt-2 pb-5 flex flex-col gap-4">
                    <div className=" flex w-full justify-between items-center  ">
                        <p className='font-semibold '>LOGO LOREM</p>
                    </div>
                    <div className="">
                        <p> Yourname</p>
                        <p> 1221434242342</p>
                    </div>

                </div>
            </aside>
            <div className={`${isSidebar ? 'lg:w-[calc(100%-16rem)]' : 'lg:w-[calc(100%-4rem)]'} transition-all ease-in-out duration-200  ml-auto min-h-screen p-4 `}>
                <Suspense fallback={<LoadingPAge />}> 
                    {children}
                </Suspense>
            </div>
        </div>
    )
}

