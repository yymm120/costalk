import { useQuery } from "@tanstack/react-query";


const fetchVideList = () => {

    const urlList = ["/video/186547-878455775.mp4", "/video/191286-889670593_small.mp4", "/video/13232-246463976.mp4",

        "/video/24715-345209726_small.mp4", "/video/145864-787701151.mp4"]
    return urlList;
}

const useVideoListQuery = () => {
    const { data } = useQuery({
        queryKey: ["aa"],
        queryFn: fetchVideList
    })

    return { data };

}

export default useVideoListQuery;