import SideNav from "../layout/SideNav";
import RecommendPage from "./recommend/page";


export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    let sidemenu = ["home", "scamper", "recommend"];
    

    

    return (
        <div>
            <SideNav >
            </SideNav>
            <RecommendPage />
        </div>

    )
}