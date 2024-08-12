import { SyntheticEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';





export default function MainBoard({ type }: { type: string }) {
    const urls = ["video/186547-878455775.mp4", "video/13232-246463976.mp4", "video/186547-878455775.mp4"];
    return (
        <div className="flex flex-col w-full justify-start" >
            <div className='h-[24px] flex justify-center items-center gap-4'>
                <button>News</button>
                <button>Works</button>
            </div>
            <div className='flex flex-col w-full justify-start pt-2 gap-4'
                style={{ overflowY: 'scroll', height: "calc(100vh-114px)" }}>
                {
                    urls.map((url) =>
                        <div key={uuidv4()} className="flex flex-col max-h-[692px] gap-1 shrink-0">
                            <div className="flex gap-1 max-h-[46px]">
                                <img src="https://placehold.co/40" />
                                <div className="flex flex-col gap-0">
                                    <div><strong>User Name</strong></div>
                                    <div>user's video name and description</div>
                                </div>
                            </div>
                            <div className="flex justify-center self-stretch">
                                <div
                                    className="relative flex h-full rounded-lg cursor-pointer"
                                >
                                    <video
                                        // onLoadedMetadata={(e) => onLoadedMetadata(e)}
                                        id={`video-${123}`}
                                        loop
                                        controls
                                        playsInline={true}
                                        preload='metadata'
                                        autoPlay={true}
                                        muted
                                        className="rounded-xl object-cover mx-auto max-h-[624px] shrink-0"
                                        src={url}
                                    />
                                    <img
                                        className="absolute right-2 bottom-10"
                                        width="90"
                                        src=""
                                    />
                                </div>
                                <div className="relative shrink-0 left-1 flex flex-col justify-end gap-2">
                                    {
                                        [...Array(3)].map(() =>
                                            <div key={uuidv4()} className='flex flex-col items-center'>
                                                <img src="https://placehold.co/32" />
                                                0
                                            </div>)
                                    }
                                </div>
                            </div>
                            <div> ------------------- </div>
                        </div>
                    )
                }
            </div>

        </div>

    );
}