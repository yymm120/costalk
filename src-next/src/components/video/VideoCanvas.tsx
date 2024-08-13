'use client'
import React, { useRef, useEffect } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDebounce, useMouseWheel, useScroll } from 'react-use';
import "./styles.css";
import { FetchNextPageOptions, FetchPreviousPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';



/**
 * 一个用Canvas封装的自定义视频播放器
 */
export default function VideoCanvas({
    fetchNextPage,
    fetchPreviousPage,
    videos,
    src, autoPlay }:
    {
        videos: InfiniteData<any, unknown>,
        updateVideo: (setUrl: React.Dispatch<React.SetStateAction<string>>) => void,
        fetchPreviousPage: (options?: FetchPreviousPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>
        fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>
        src: string,
        autoPlay: boolean, muted: boolean
    }) {
    const [url, setUrl] = useState(src);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [video, canvas, context] = useCreateVide(url, videoContainerRef, canvasRef);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(50);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [expand, setExpand] = useState(false);
    const volumeProgressBarRef = useRef<HTMLProgressElement | null>(null);


    /**
     * 初始化音量
     */
    useEffect(() => {
        if (video) {
            video.volume = volume / 100;
        }
    }, [video, volume])



    /**
     * 渲染视频
     */
    const drawVideo = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const animation = requestAnimationFrame(drawVideo);
        video.onpause = () => {
            cancelAnimationFrame(animation);
        }
        video.onclose = () => {
            cancelAnimationFrame(animation);
        }
        video.oncancel = () => {
            cancelAnimationFrame(animation);
        }
    }



    /**
     * 进入页面立即尝试自动播放 
     */
    useEffect(() => {
        if (!canvas || !context || !video) return;
        if (video.autoplay) {
            video.muted = false;
            let i = 0;
            const tryPlay = () => {
                const promise = video.play();
                if (promise !== undefined) {
                    promise.then(_ => {
                        drawVideo();
                    }).catch(error => {
                        i += 1;
                        if (i <= 1) {
                            video.muted = true;
                            tryPlay();
                        } else {
                            console.log("自动播放失败, 静音自动播放也失败。请手动点击播放按钮。")
                            setShowPlayButton(true);
                        }
                    })
                }
            }
            tryPlay();
        }
    }, [video])



    /**
     * 控制器: 控制播放和暂停
     */
    const handlePlay = () => {
        if (video.paused == true) {
            if (!canvas || !context || !video) return;
            video.muted = false;
            video.play();
        } else {
            video.pause();
        }
    }



    /**
     * 控制器: 控制音量
     */
    const handleMuted = () => {
        if (muted) {
            video.muted = false;
            setMuted(false);
        } else {
            video.muted = true;
            setMuted(true);
        }
    }



    /**
     * 控制器: 控制全屏和缩放
     */
    const handleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoContainerRef.current?.requestFullscreen();
        }
    }



    /**
     * 滚动滚轮时刷新下一个视频或者上一个视频
     */
    const mouseWheel = useMouseWheel()
    const [wheel, setWheel] = useState(mouseWheel);
    useDebounce(async () => {
        if (mouseWheel == wheel) return;
        if (mouseWheel > wheel) {
            console.log('down')
            // // === 
            // const prePage: number = videos.pageParams[videos.pageParams.length - 1] as  number;
            // // ===
            const { data } = await fetchNextPage()
            if (data && data.pages?.length > 0) {
                const index = data.pages.length - 1;
                const currentUrl = data.pages[index][0].url + ".mp4"
                if (url != currentUrl) {
                    video.src = '';
                    video.load();
                    setUrl(currentUrl)
                    setWheel(mouseWheel);
                }
            }
        } else {
            console.log("up")
            const { data } = await fetchPreviousPage()
            if (data && data.pages?.length > 0) {
                const currentUrl = data.pages[0][0].url + ".mp4"
                if (url != currentUrl) {
                    video.src = '';
                    video.load();
                    setUrl(currentUrl)
                    setWheel(mouseWheel);
                }
            }
        }
    }, 200, [mouseWheel]);



    /**
     * 控制器: 音量控制
     */
    const handleVolumeUpdate = useVolumeProgressUpdate(video, volumeProgressBarRef, setVolume)



    // TODO: 缩放到最小尺寸后 (浏览器尺寸840/460时), 通过媒体查询改变样式 (目前, 自动缩放的最大尺寸为: 1692/828, 最小尺寸设置为: 624/362)
    return (
        <div className="flex w-full pr-[56px] h-full pb-[24px] grow">
            <div className="flex flex-col w-full grow">
                <div
                    className={`relative grow flex gap-[110px] min-h-[362px] max-h-[828px] min-w-[624px] max-x-[1692px] w-full rounded-3xl overflow-hidden
            transition-all scroll-smooth 
            `}
                    style={{
                        aspectRatio: "1692/828",
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        backgroundSize: 'cover',
                        backgroundBlendMode: 'multiply',
                    }}
                    ref={videoContainerRef}
                >
                    <div className='pl-[110px] flex min-h-[362px] justify-center relative grow' style={{
                    }}>
                        <canvas id="video-container" ref={canvasRef}
                            className='max-h-full'
                            width={'100%'}
                            style={
                                {
                                    aspectRatio: 'auto',
                                    objectFit: 'contain'
                                }
                            }
                        ></canvas>
                        <div className='group bg-gray-900/[.15] px-[24px] absolute bottom-0 flex justify-start gap-[24px] w-full h-[48px] items-center'>
                            <button className={`rounded-md hover:scale-125 transition-all`} onClick={handlePlay}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.4575 11.1105C22.5142 11.7266 22.5142 13.2668 21.4575 13.8829L3.62735 24.2799C2.5707 24.896 1.25 24.1259 1.25 22.8936V2.09981C1.25 0.867582 2.5707 0.0974322 3.62735 0.713545L21.4575 11.1105Z" fill="black" />
                                </svg>
                            </button>
                            <button className={`rounded-md hover:scale-125 transition-all`} onClick={handleMuted}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 21C19.527 19.453 21.999 16.091 21.999 12C21.999 7.909 19.527 4.547 16 3V5C18.387 6.386 19.999 9.047 19.999 12C19.999 14.953 18.387 17.614 16 19V21Z" fill="black" />
                                    <path d="M16 6.99996V17C17.225 15.9 18 13.771 18 12C18 10.229 17.225 8.09996 16 6.99996ZM4 17H6.697L14 21.868V2.13196L6.697 6.99996H4C2.897 6.99996 2 7.89696 2 8.99996V15C2 16.103 2.897 17 4 17Z" fill="black" />
                                </svg>
                            </button>
                            <CustomProgress video={video} />
                            <progress id="volume-progress" max={100} value={volume}
                                onMouseDown={handleVolumeUpdate}
                                ref={volumeProgressBarRef}
                                className={`
                        h-[8px] rounded-lg opacity-75 hover:cursor-pointer hover:opacity-100
                        `}></progress>
                            <button onClick={handleFullScreen} className='absolute right-[24px] top-[12px] rounded-md hover:scale-150 transition-all'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.57143 14.5714H3V21H9.42857V18.4286H5.57143V14.5714ZM3 9.42857H5.57143V5.57143H9.42857V3H3V9.42857ZM18.4286 18.4286H14.5714V21H21V14.5714H18.4286V18.4286ZM14.5714 3V5.57143H18.4286V9.42857H21V3H14.5714Z" fill="black" />
                                </svg>

                            </button>
                        </div>
                        <div className={`absolute ${showPlayButton ? '' : 'hidden'}`} >Play</div>
                    </div>
                    <div
                        className={`relative 
                    ${expand ? 'w-[460px] bg-white transition-all' : 'bg-gray-500/10 right-0 h-full w-[36px] motion-safe:animate-pulse transition-all'} 
                `}>
                        <button onClick={() => setExpand(!expand)} className={`${expand ? 'absolute top-4 right-4' : 'w-full h-full'}`}>xx</button>
                    </div>
                </div>
            </div>

        </div>
    );
}


const CustomProgress: React.FC<{ video: HTMLVideoElement }> = ({ video }: { video: HTMLVideoElement }) => {

    const videoProgressBarRef = useRef<HTMLProgressElement | null>(null);
    const { progress: [progressValue, setProgressValue], handler: mouseDownHandler } = useVideoProgressUpdate(video, videoProgressBarRef);
    const style = useMemo(() => ({
        '--progress-value': `${progressValue}%`
    }), [progressValue])

    return (
        <progress id="video-progress" max={100} value={progressValue} ref={videoProgressBarRef}
            onMouseDown={mouseDownHandler}
            className={
                `absolute left-0 top-[-1px] h-[1px] w-full after:left-[calc(var(--progress-value)-4px)] group-hover:h-[6px] group-hover:top-[-3px] hover:cursor-pointer`
            } style={
                {
                    ...style,
                    // pointerEvents: 'none'
                } as React.CSSProperties}>
        </progress>
    )
}

/**
 * @description 关于如何更新视频进度条的hook, 需要调用者提供一个video和一个progress
 * @returns 返回受控的进度条状态和一个进度条onMousedDown的处理函数 
 * <pre>
 *    { progress: [progressValue, setProgressValue], handler: mouseDownHandler }
 * </pre>
 * 
 */
function useVideoProgressUpdate(video: HTMLVideoElement, progressBarRef: React.RefObject<HTMLProgressElement>): {
    progress: [number, React.Dispatch<React.SetStateAction<number>>],
    handler: React.MouseEventHandler<HTMLProgressElement>
} {
    const [progressValue, setProgressValue] = useState(0);
    // const throttledValue = useThrottle(progressValue, 200);

    // useDebounce and useThrottle

    // /**
    //  * @description 更新video.currentTime
    //  * @deps [progressValue]
    //  * @affect none affect
    //  */
    // useEffect(() => {
    //     if (video && video.duration != 0) {
    //         const currentTime = (progressValue / 100) * video.duration;
    //         video.currentTime = Number(currentTime.toFixed(0));
    //     }
    // }, [progressValue])


    /**
     * @description 当视频更新时, 提供一个更新播放进度的函数
     * @param x x 是鼠标所处位置的x值
     */
    const updateVideoProgress = useCallback((x: number) => {
        if (video && progressBarRef.current) {
            const progressBarLeft = progressBarRef.current.getBoundingClientRect().left;
            const progressBarRight = progressBarRef.current.getBoundingClientRect().right;
            const progressBarWidth = progressBarRef.current.getBoundingClientRect().width;
            // 根据鼠标x位置, 计算当前进度
            const progressX = x - progressBarLeft;
            const currentProgressValue = (progressX / progressBarWidth) * 100;
            // 防止超出进度条的最大范围
            if (x <= progressBarLeft) {
                if (video.duration != 0) {
                    setProgressValue(0);
                    video.currentTime = 0;
                }
            } else if (x >= progressBarLeft + progressBarWidth) {
                if (video.duration != 0) {
                    setProgressValue(100);
                    video.currentTime = Number(video.duration)
                }
            } else {
                if (video.duration) {
                    setProgressValue(currentProgressValue);
                    const currentTime = (currentProgressValue / 100) * video.duration
                    video.currentTime = Number(currentTime.toFixed(2))
                }
            }
        }
    }, [video, progressBarRef, setProgressValue])



    /**
     * @description 当视频更新时, 立刻初始化进度条
     * @deps [video]
     * @affect [progressValue]
     */
    useEffect(() => {
        const handleTimeUpdate = () => {
            // 同步播放进度到自定义进度条
            if (video && video.currentTime) {
                const currentTime = video.currentTime;
                const duration = video.duration;
                const progressValue = (currentTime / duration) * 100;
                setProgressValue(Number(progressValue.toFixed(2)));
            } else {
                setProgressValue(0);
            }
        };
        video?.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            video?.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, [video])

    /**
     * @description 更新VideoProgress的处理器, 在mouseDown中调用, 同时被mouseMove监听
     * @param event 必须传入一个MouseEvent, 才可以作为addEventListener的第二个参数。
     */
    const updateVideoProgressHandler = useCallback((event: MouseEvent) => {
        event.preventDefault();
        if (progressBarRef.current && video) {
            updateVideoProgress(event.clientX);
        }
    }, [updateVideoProgress])

    /**
     * @description 当鼠标按下, 调用updateVideoProgressHandler更新播放进度, 然后监听鼠标放开事件和鼠标移动事件
     * @param event 必须传入一个MouseEvent, 才可以作为removeEventListener的第二个参数。
     */
    const handleMouseDown = useCallback((event: MouseEvent) => {
        event.preventDefault();
        let ispaused = video.paused;
        !ispaused && video.pause();
        updateVideoProgressHandler(event as unknown as MouseEvent);

        // 鼠标放开事件
        const handleMouseUp: () => void = () => {
            document.removeEventListener('mousemove', updateVideoProgressHandler);
            document.removeEventListener('mouseup', handleMouseUp);
            !ispaused && video.play();
        }
        document.addEventListener('mouseup', handleMouseUp);

        // 在鼠标按下事件内, 监听鼠标移动事件。(拖拽时, 更新播放进度)
        document.addEventListener('mousemove', updateVideoProgressHandler);

        // 清除监听
        return () => {
            document.removeEventListener('mousemove', updateVideoProgressHandler);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [updateVideoProgressHandler])


    useEffect(() => {
        // 清除监听, 不清楚有没有在此处设置清除监听的必要
        return () => {
            document.removeEventListener('mousemove', updateVideoProgressHandler);
            document.removeEventListener('mousedown', handleMouseDown);
        }
    }, [handleMouseDown])

    // 返回handleMouseDownHandler, 提供给progress的onMouseDown属性
    return {
        progress: [progressValue, setProgressValue],
        handler: handleMouseDown as unknown as React.MouseEventHandler<HTMLProgressElement>
    };
}


function useVolumeProgressUpdate(video: HTMLVideoElement, volumeProgressBarRef: React.RefObject<HTMLProgressElement>, setProgressValue: React.Dispatch<React.SetStateAction<number>>): React.MouseEventHandler<HTMLProgressElement> {
    const updateVolumeProgress = useCallback((event: MouseEvent) => {
        if (volumeProgressBarRef.current) {
            event.preventDefault();
            const progressBarRect = volumeProgressBarRef.current.getBoundingClientRect();
            const progressValue = (event.clientX - progressBarRect.left) / progressBarRect.width * 100;
            setProgressValue(progressValue);
            video.volume = progressValue / 100;
        }
    }, [volumeProgressBarRef, setProgressValue, video])

    const handleMouseDown = useCallback((event: MouseEvent) => {
        event.preventDefault();
        updateVolumeProgress(event as unknown as MouseEvent);
        const handleMouseUp: () => void = () => {
            document.removeEventListener('mousemove', updateVolumeProgress);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        document.addEventListener('mousemove', updateVolumeProgress);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', updateVolumeProgress);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [updateVolumeProgress])


    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', updateVolumeProgress);
            document.removeEventListener('mousedown', handleMouseDown);
        }
    }, [handleMouseDown])

    return handleMouseDown as unknown as React.MouseEventHandler<HTMLProgressElement>;
}

const useCreateVide = (url: string, containerRef: React.RefObject<HTMLDivElement>, canvasRef: React.RefObject<HTMLCanvasElement>):
    [HTMLVideoElement, HTMLCanvasElement, CanvasRenderingContext2D] => {
    const [video, setVideo] = useState<HTMLVideoElement | null>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        let animation: number | null = null;
        const createVideo = () => {
            const videoElement = document.createElement('video');
            videoElement.src = url;
            videoElement.preload = 'auto';
            videoElement.loop = true;
            videoElement.controls = false;
            videoElement.muted = true;
            videoElement.autoplay = true;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const bgCanvas = document.createElement('canvas');
            const bgCtx = bgCanvas.getContext('2d');
            const context = canvasRef.current!.getContext('2d');
            if (!context) return;
            const drawVideo = () => {
                if (!canvas || !context || !videoElement) return;
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                animation = requestAnimationFrame(drawVideo);
                videoElement.onpause = () => {
                    cancelAnimationFrame(animation!);
                }
            }
            // setting background
            videoElement.onloadeddata = () => {
                if (videoElement.poster && containerRef.current) {
                    const bgWidth = canvas.width / 200;
                    const bgHeight = canvas.height / 200;
                    containerRef.current!.style.backgroundSize = `${bgWidth}px ${bgHeight}px, cover`;
                    containerRef.current!.style.backgroundImage = `url(${videoElement.poster})`;
                }
            }

            videoElement.onplay = () => {
                drawVideo();
            }

            // 1. init background img. 2. auto play
            videoElement.oncanplay = () => {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;

                // draw first keyframe
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                // setting background
                if (!videoElement.poster && containerRef.current) {
                    bgCanvas.width = canvas.width / 200;
                    bgCanvas.height = canvas.height / 200;
                    bgCtx!.drawImage(videoElement, 0, 0, bgCanvas.width, bgCanvas.height);
                    containerRef.current.style.backgroundImage = ` url(${bgCtx?.canvas.toDataURL()})`;
                }
            }
            setVideo(videoElement);
            setContext(context);
            setCanvas(canvas);
        };
        createVideo();

        return () => {
            if (video) {
                video.src = '';
                video.load();
            }
            if (animation) {
                cancelAnimationFrame(animation)
            }
        };
    }, [url])
    return [video!, canvas!, context!];
}

