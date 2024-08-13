
// Home page
import VideoCanvas from "@/components/video/VideoCanvas";
import VideoList from "@/components/video/VideoList";


const RecommendPage: React.FC = () => {
    return (
        <div className="fixed left-[172px] mt-[24px] py-[6px] w-[calc(100vw-172px)] min-w-[680px] h-[calc(100vh-108px)]">
            <VideoList />
        </div>

    )
}


export default RecommendPage;