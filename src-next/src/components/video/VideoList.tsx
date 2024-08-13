'use client'
import useVideoListQuery from "@/hooks/useVideoListQuery";
import VideoCanvas from "./VideoCanvas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";


const getVideos = async (pageParam: number) => {
    const res = await fetch(`http://localhost:8000/videos/${pageParam}`);
    const data = await res.json();
    return { ...data, preOffset: pageParam };
}

export const VideoList: React.FC = () => {

    const {
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        data
    } = useInfiniteQuery({
        queryKey: ["video"],
        queryFn: ({ pageParam }) => getVideos(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            if (lastPageParam >= 4) {
                return 0;
            }
            return lastPageParam + 1;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => {
            if (firstPageParam <= 0) {
                return 4;
            }
            return firstPageParam - 1;
        }
    });






    return (
        <>
            {data?.pages &&
                // (() => { console.log(data.pages[0][0].url); return true })() &&
                <VideoCanvas videos={data} fetchPreviousPage={fetchPreviousPage} fetchNextPage={fetchNextPage} autoPlay={true} muted={true} src={`${data.pages[0][0].url}.mp4`} updateVideo={(setUrl: React.Dispatch<React.SetStateAction<string>>) => setUrl("/video/191286-889670593_small.mp4")} />}

        </>
    )
}


export default VideoList;