import { TopNav } from "@/app/layout/TopNav";


export default function UploadLayout({children} : {children: React.ReactNode}) {
    return (
        <>
            <div className="bg-[#F8F8F8] h-[100vh]">
                <TopNav/>
                <div className="flex justify-between mx-auto w-full px-2 max-x-[1140px]">
                    {children}
                </div>
            </div>
        </>
    )
}