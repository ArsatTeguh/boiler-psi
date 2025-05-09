

export default function Sidebar() {
    let isSidebarOpen = true
    return (
        <aside
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 flex w-[calc(100%-6rem)] flex-col items-center gap-y-8 bg-white px-2 py-4 duration-300 ease-in-out dark:bg-zinc-800 md:w-64 lg:translate-x-0 lg:duration-0`}
        >
            <ul className="space-y-4">
                <li>home</li>
                <li>home</li>
                <li>home</li>
                <li>home</li>
            </ul>
        </aside>
    )
}