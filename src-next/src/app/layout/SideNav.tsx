import { usePathname } from "next/navigation";


export default function SideNav() {
    const pathname = usePathname();
    return (
        <>
            <div id="SideNav"
                className={`
                    fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
                    ${pathname === '/' ? 'lg:w-[310px]': 'lg:w-[220px]'}
                    `}
            >
            </div>
        </>
    )
}