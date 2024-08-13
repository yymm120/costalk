import MainBoard from "@/components/MainBoard"
import TableBoard from "@/components/TableBoard"



const WorkingPage: React.FC = () => {
    return (
        <div className="flex gap-[6%] justify-center w-full h-[calc(100vh-90px)]">
            <div className="flex row-col basis-1/6">
                <TableBoard type="assign_to_me" />
            </div>
            <div className="flex row-col basis-2/6">
                <MainBoard type='news' />
            </div>
            <div className="flex row-col basis-1/6">
                <TableBoard type="publish_to_world" />
            </div>
        </div>
    )
}