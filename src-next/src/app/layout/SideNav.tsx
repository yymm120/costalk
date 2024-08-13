'use client'
import { useEffect } from "react";
import "./styles.css";
import { usePathname } from "next/navigation";


export default function SideNav() {
    const pathname = usePathname();

    return (
        <>
            <div id="SideNav"
                className={`
                   fixed w-[156px] mt-[24px] py-[6px]
                    `}
            >
                <div className="flex flex-col gap-2 items-center">
                    <div className={`flex gap-[8px] button-border items-center ${pathname === '/scamper'? 'button-border-gradient': ''} px-[30px] py-[8px]  hover:cursor-pointer`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.18408 11.3751L12.2501 2.75012L22.3161 11.3751" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                            <path d="M16.562 21.2498H20.16V10.1588" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                            <path d="M4.34277 10.1588V21.2498H12.0818" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                            <path d="M12.2495 12.7047V16.1127" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                        <span className="text-base">首页</span>
                    </div>
                    <div className={`flex gap-[8px] button-border items-center px-[30px] py-[8px]  hover:cursor-pointer
                        ${pathname === '/recommend' ? 'button-border-gradient': ''}
                        `}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.18408 11.3751L12.2501 2.75012L22.3161 11.3751" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                            <path d="M16.562 21.2498H20.16V10.1588" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                            <path d="M4.34277 10.1588V21.2498H12.0818" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                            <path d="M12.2495 12.7047V16.1127" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                        <span className="text-base">推荐</span>
                    </div>
                </div>
            </div>
        </>
    )
}