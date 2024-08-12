import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { TopNav } from "./layout/TopNav";
// import { WindowTitleBar } from '@/components/titlebar/WindowTitleBar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <WindowTitleBar/> */}
        <Theme appearance="light">
          <TopNav />
          <main className=" absolute w-full top-[60px]" >
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}



export function Footbar() {
  return (
    <>
    <div id="Footbar" className="fixed bottom-0 bg-white z-30 flex items-center w-full border-b h-[36px]">
        <div>hello</div>
        <div>hello</div>
      </div>
    </>
  )
}


