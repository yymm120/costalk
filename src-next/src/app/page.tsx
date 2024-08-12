'use client'
import { CSSProperties, useEffect, useState } from 'react';
import './styles.css';
import CircleProgress from '@/components/progress/CircleProgress';
import { useThemeContext } from '@radix-ui/themes';
import { LandingPagePropsType } from '@/types';
import DaoButton from '@/components/button/DaoButton';
import TableBoard from '@/components/TableBoard';
import MainBoard from '@/components/MainBoard';


export default function Home() {
    const [landingShow, setLandingShow] = useState(true);

    const whellHandler = () => {
        setLandingShow(true);
    }
  return (
    <>
      <div className="flex gap-[6%] justify-center w-full h-[calc(100vh-90px)]">
        <div className="flex row-col basis-1/6">
            <TableBoard type="assign_to_me"/>
        </div>
        <div className="flex row-col basis-2/6">
            <MainBoard type='news' />
        </div>
        <div className="flex row-col basis-1/6">
            <TableBoard type="publish_to_world" />
        </div>
      </div>
    </>
  );
}


export function LandingPage({setLandingShow}: LandingPagePropsType) {
    const themeContext = useThemeContext();
    
    function whellHandler() {
      setLandingShow(false);
    }
    
    return (
        <>
            <div onWheel={() => whellHandler()} className={`flex flex-col h-[calc(100vh-60px)] w-full px-[24px] py-[24px] lg:py-[90px] lg:px-[396px]`}>
                <section className="h-4/5 flex flex-col lg:flex-row pt-40 gap-[20px] lg:gap-[168px]">
                    <div className="flex flex-col justify-center">
                        <h2 className={`${themeContext.appearance == 'dark'? 'text-white': 'text-black'} h-40 text-5xl lg:text-9xl font-bold font-['Inter']`}>The Dao</h2>
                        <p className={`${themeContext.appearance == 'dark'? 'text-white': 'text-black'} text-[24px] font-semibold font-['Arial']`}>
                            The law of world is to reduce excess and supplement deficiency.</p>
                        <p className={`${themeContext.appearance == 'dark'? 'text-white': 'text-black'} text-[24px] font-semibold font-['Arial']`}>
                            The law of society is to reduce deficiency to supplement excess.
                        </p>
                        <p className={`${themeContext.appearance == 'dark'? 'text-white': 'text-black'} relative top-8 text-[24px] font-semibold font-['Arial']`}>
                            Who can maintain social stability? Only those who follow the Dao.
                        </p>
                        <div className="relative top-24 flex gap-[16px]">
                            <div className="w-[172px] h-[48px] text-[24px] border-2 rounded-md flex items-center justify-center gap-2">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.2184 15.7908C20.8818 16.7244 21.6424 17.328 22.5 17.6017C22.1278 18.7445 21.5372 19.9356 20.7281 21.1751C19.4821 23.0423 18.2523 23.9759 17.0388 23.9759C16.5858 23.9759 15.9142 23.823 15.0242 23.5172C14.199 23.2113 13.4789 23.0584 12.864 23.0584C12.2492 23.0584 11.5696 23.2194 10.8252 23.5413C10.0485 23.8471 9.40937 24 8.90775 24C7.45145 24 6.01941 22.7687 4.61164 20.3058C3.20388 17.8753 2.5 15.4849 2.5 13.1349C2.5 10.9618 3.03398 9.18312 4.10194 7.79881C5.20226 6.4145 6.56149 5.72234 8.1796 5.72234C8.53559 5.72234 8.93202 5.76662 9.36892 5.85514C9.80581 5.94367 10.2589 6.10866 10.7281 6.35011C11.2297 6.62375 11.6424 6.81289 11.966 6.91752C12.2896 7.02215 12.5404 7.07446 12.7184 7.07446C12.9288 7.07446 13.2524 7.02617 13.6893 6.9296C14.1262 6.83301 14.563 6.65594 15 6.3984C15.4692 6.14086 15.8737 5.9477 16.2136 5.81893C16.5534 5.69015 16.9013 5.62577 17.2573 5.62577C18.3899 5.62577 19.4093 5.93161 20.3155 6.54328C20.8009 6.86521 21.2945 7.34005 21.7961 7.96782C21.0518 8.61168 20.5097 9.17507 20.1699 9.65797C19.5388 10.5594 19.2233 11.5413 19.2233 12.6037C19.2233 13.7788 19.555 14.8411 20.2184 15.7908ZM15.3397 4.5151C14.7734 5.04628 14.2557 5.39236 13.7864 5.55333C13.6246 5.60163 13.4183 5.64589 13.1675 5.68613C12.9166 5.72637 12.6294 5.76259 12.3058 5.79478C12.322 4.37827 12.6942 3.15493 13.4223 2.12475C14.1505 1.09456 15.3479 0.386319 17.0146 0C17.0468 0.160966 17.0712 0.273643 17.0873 0.338029V0.603624C17.0873 1.1831 16.9498 1.83501 16.6747 2.55936C16.3834 3.26761 15.9385 3.91953 15.3397 4.5151Z" fill={`${themeContext.appearance == 'dark'? 'white': 'black'}`} />
                                </svg>
                                App Store
                            </div>
                            <div className="w-[172px] h-[48px] text-[24px] border-2 rounded-md flex items-center justify-center gap-2">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5133 24.6166C10.1428 24.6132 9.78841 24.4602 9.52643 24.1904C9.26444 23.9205 9.11579 23.5556 9.11247 23.174V19.8953H7.83904C7.53508 19.8953 7.24357 19.771 7.02864 19.5496C6.81371 19.3283 6.69296 19.028 6.69296 18.715V8.09206H19.4272V18.715C19.4272 19.028 19.3066 19.3283 19.0916 19.5496C18.8767 19.771 18.5851 19.8953 18.2812 19.8953H17.0078V23.174C17.0078 23.5566 16.8602 23.9236 16.5975 24.1942C16.3348 24.4647 15.9785 24.6166 15.607 24.6166C15.2354 24.6166 14.8791 24.4647 14.6164 24.1942C14.3537 23.9236 14.2062 23.5566 14.2062 23.174V19.8953H12.0414V23.174C11.9892 23.5599 11.8081 23.915 11.5292 24.1783C11.2503 24.4416 10.8911 24.5965 10.5133 24.6166ZM21.5922 16.8789C21.2217 16.8755 20.8673 16.7225 20.6053 16.4527C20.3433 16.1828 20.1947 15.8178 20.1913 15.4363V9.53467C20.1913 9.15207 20.3389 8.78513 20.6016 8.51458C20.8643 8.24404 21.2206 8.09206 21.5922 8.09206C21.9636 8.09206 22.3199 8.24404 22.5826 8.51458C22.8453 8.78513 22.9929 9.15207 22.9929 9.53467V15.4363C23.013 15.6308 22.9905 15.8275 22.9272 16.0119C22.8639 16.1964 22.7614 16.3638 22.627 16.5022C22.4928 16.6404 22.33 16.7461 22.151 16.8113C21.972 16.8764 21.781 16.8996 21.5922 16.8789ZM4.40077 16.8789C4.0303 16.8755 3.67593 16.7225 3.41395 16.4527C3.15197 16.1828 3.00332 15.8178 3 15.4363V9.53467C3 9.34523 3.03623 9.15763 3.10663 8.98261C3.17702 8.80758 3.2802 8.64854 3.41028 8.51458C3.54035 8.38062 3.69477 8.27436 3.86472 8.20186C4.03467 8.12936 4.21682 8.09206 4.40077 8.09206C4.58473 8.09206 4.76688 8.12936 4.93683 8.20186C5.10678 8.27436 5.2612 8.38062 5.39127 8.51458C5.52134 8.64854 5.62453 8.80758 5.69493 8.98261C5.76532 9.15763 5.80156 9.34523 5.80156 9.53467V15.4363C5.79822 15.8178 5.64959 16.1828 5.3876 16.4527C5.12562 16.7225 4.77125 16.8755 4.40077 16.8789ZM19.4272 7.17402H6.69296C6.80446 6.17674 7.16923 5.22735 7.7505 4.42149C8.33175 3.61564 9.10899 2.98181 10.0039 2.58385L8.85779 0.878933V0.747785C8.85779 0.713003 8.87121 0.679646 8.89508 0.65505C8.91896 0.630455 8.95136 0.616638 8.98513 0.616638H9.11247C9.23982 0.616638 9.23982 0.616638 9.23982 0.747785L10.5133 2.58385C12.1954 1.92813 14.0522 1.92813 15.7343 2.58385L17.0078 0.747785L17.135 0.616638H17.2624C17.3898 0.747785 17.3898 0.878933 17.2624 0.878933L16.1164 2.58385C17.0112 2.98181 17.7884 3.61564 18.3697 4.42149C18.951 5.22735 19.3158 6.17674 19.4272 7.17402ZM15.8616 3.89533C15.7602 3.89087 15.6589 3.90819 15.5643 3.94615C15.4696 3.98412 15.3836 4.04192 15.3118 4.1159C15.2399 4.18987 15.1838 4.27841 15.1469 4.3759C15.11 4.47338 15.0933 4.57769 15.0976 4.68222C15.0827 4.78912 15.0922 4.89814 15.1253 5.00062C15.1584 5.10309 15.2143 5.19621 15.2885 5.27258C15.3626 5.34896 15.453 5.40647 15.5525 5.44059C15.652 5.4747 15.7579 5.48447 15.8616 5.46909C15.9631 5.47355 16.0644 5.45625 16.1591 5.41828C16.2537 5.38031 16.3397 5.3225 16.4116 5.24852C16.4834 5.17455 16.5396 5.08601 16.5764 4.98853C16.6132 4.89105 16.6301 4.78674 16.6257 4.68222C16.4983 4.15762 16.2437 3.89533 15.8616 3.89533ZM10.3859 3.89533C10.2844 3.89087 10.1831 3.90819 10.0885 3.94615C9.99382 3.98412 9.90785 4.04192 9.83602 4.1159C9.76419 4.18987 9.70806 4.27841 9.67119 4.3759C9.63432 4.47338 9.61752 4.57769 9.62184 4.68222C9.62184 4.78555 9.64161 4.88787 9.68001 4.98334C9.7184 5.07882 9.77469 5.16556 9.84564 5.23862C9.91659 5.3117 10.0008 5.36965 10.0935 5.4092C10.1862 5.44874 10.2856 5.46909 10.3859 5.46909C10.4862 5.46909 10.5856 5.44874 10.6783 5.4092C10.771 5.36965 10.8552 5.3117 10.9262 5.23862C10.9971 5.16556 11.0534 5.07882 11.0918 4.98334C11.1302 4.88787 11.15 4.78555 11.15 4.68222C11.0226 4.15762 10.7679 3.89533 10.3859 3.89533Z" fill={`${themeContext.appearance == 'dark'? 'white': 'black'}`} />
                                </svg>
                                Android
                            </div>
                            <div className="w-[172px] h-[48px] text-[24px] border-2 rounded-md flex items-center justify-center gap-2">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5133 24.6166C10.1428 24.6132 9.78841 24.4602 9.52643 24.1904C9.26444 23.9205 9.11579 23.5556 9.11247 23.174V19.8953H7.83904C7.53508 19.8953 7.24357 19.771 7.02864 19.5496C6.81371 19.3283 6.69296 19.028 6.69296 18.715V8.09206H19.4272V18.715C19.4272 19.028 19.3066 19.3283 19.0916 19.5496C18.8767 19.771 18.5851 19.8953 18.2812 19.8953H17.0078V23.174C17.0078 23.5566 16.8602 23.9236 16.5975 24.1942C16.3348 24.4647 15.9785 24.6166 15.607 24.6166C15.2354 24.6166 14.8791 24.4647 14.6164 24.1942C14.3537 23.9236 14.2062 23.5566 14.2062 23.174V19.8953H12.0414V23.174C11.9892 23.5599 11.8081 23.915 11.5292 24.1783C11.2503 24.4416 10.8911 24.5965 10.5133 24.6166ZM21.5922 16.8789C21.2217 16.8755 20.8673 16.7225 20.6053 16.4527C20.3433 16.1828 20.1947 15.8178 20.1913 15.4363V9.53467C20.1913 9.15207 20.3389 8.78513 20.6016 8.51458C20.8643 8.24404 21.2206 8.09206 21.5922 8.09206C21.9636 8.09206 22.3199 8.24404 22.5826 8.51458C22.8453 8.78513 22.9929 9.15207 22.9929 9.53467V15.4363C23.013 15.6308 22.9905 15.8275 22.9272 16.0119C22.8639 16.1964 22.7614 16.3638 22.627 16.5022C22.4928 16.6404 22.33 16.7461 22.151 16.8113C21.972 16.8764 21.781 16.8996 21.5922 16.8789ZM4.40077 16.8789C4.0303 16.8755 3.67593 16.7225 3.41395 16.4527C3.15197 16.1828 3.00332 15.8178 3 15.4363V9.53467C3 9.34523 3.03623 9.15763 3.10663 8.98261C3.17702 8.80758 3.2802 8.64854 3.41028 8.51458C3.54035 8.38062 3.69477 8.27436 3.86472 8.20186C4.03467 8.12936 4.21682 8.09206 4.40077 8.09206C4.58473 8.09206 4.76688 8.12936 4.93683 8.20186C5.10678 8.27436 5.2612 8.38062 5.39127 8.51458C5.52134 8.64854 5.62453 8.80758 5.69493 8.98261C5.76532 9.15763 5.80156 9.34523 5.80156 9.53467V15.4363C5.79822 15.8178 5.64959 16.1828 5.3876 16.4527C5.12562 16.7225 4.77125 16.8755 4.40077 16.8789ZM19.4272 7.17402H6.69296C6.80446 6.17674 7.16923 5.22735 7.7505 4.42149C8.33175 3.61564 9.10899 2.98181 10.0039 2.58385L8.85779 0.878933V0.747785C8.85779 0.713003 8.87121 0.679646 8.89508 0.65505C8.91896 0.630455 8.95136 0.616638 8.98513 0.616638H9.11247C9.23982 0.616638 9.23982 0.616638 9.23982 0.747785L10.5133 2.58385C12.1954 1.92813 14.0522 1.92813 15.7343 2.58385L17.0078 0.747785L17.135 0.616638H17.2624C17.3898 0.747785 17.3898 0.878933 17.2624 0.878933L16.1164 2.58385C17.0112 2.98181 17.7884 3.61564 18.3697 4.42149C18.951 5.22735 19.3158 6.17674 19.4272 7.17402ZM15.8616 3.89533C15.7602 3.89087 15.6589 3.90819 15.5643 3.94615C15.4696 3.98412 15.3836 4.04192 15.3118 4.1159C15.2399 4.18987 15.1838 4.27841 15.1469 4.3759C15.11 4.47338 15.0933 4.57769 15.0976 4.68222C15.0827 4.78912 15.0922 4.89814 15.1253 5.00062C15.1584 5.10309 15.2143 5.19621 15.2885 5.27258C15.3626 5.34896 15.453 5.40647 15.5525 5.44059C15.652 5.4747 15.7579 5.48447 15.8616 5.46909C15.9631 5.47355 16.0644 5.45625 16.1591 5.41828C16.2537 5.38031 16.3397 5.3225 16.4116 5.24852C16.4834 5.17455 16.5396 5.08601 16.5764 4.98853C16.6132 4.89105 16.6301 4.78674 16.6257 4.68222C16.4983 4.15762 16.2437 3.89533 15.8616 3.89533ZM10.3859 3.89533C10.2844 3.89087 10.1831 3.90819 10.0885 3.94615C9.99382 3.98412 9.90785 4.04192 9.83602 4.1159C9.76419 4.18987 9.70806 4.27841 9.67119 4.3759C9.63432 4.47338 9.61752 4.57769 9.62184 4.68222C9.62184 4.78555 9.64161 4.88787 9.68001 4.98334C9.7184 5.07882 9.77469 5.16556 9.84564 5.23862C9.91659 5.3117 10.0008 5.36965 10.0935 5.4092C10.1862 5.44874 10.2856 5.46909 10.3859 5.46909C10.4862 5.46909 10.5856 5.44874 10.6783 5.4092C10.771 5.36965 10.8552 5.3117 10.9262 5.23862C10.9971 5.16556 11.0534 5.07882 11.0918 4.98334C11.1302 4.88787 11.15 4.78555 11.15 4.68222C11.0226 4.15762 10.7679 3.89533 10.3859 3.89533Z" fill={`${themeContext.appearance == 'dark'? 'white': 'black'}`} />
                                </svg>
                                Windows
                            </div>
                        </div>
                    </div>
                    <CircleProgress />
                </section>

            </div>
            <ColorBackground className="fixed z-0 top-36 left-72" />
        </>
    )
}


export function ColorBackground({ className }: { className: string | undefined }) {

    return (
        <>
            <svg onClick={() => {}} className={className} width="1096" height="663" viewBox="0 0 1096 663" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_521_734)">
                    <path d="M328.5 444C328.5 530.985 1149.48 284.5 1062.5 284.5C975.515 284.5 200 530.985 200 444C200 357.015 241.515 200 328.5 200C415.485 200 328.5 357.015 328.5 444Z" fill="url(#paint0_linear_521_734)" fillOpacity="0.7" />
                </g>
                <defs>
                    <filter id="filter0_f_521_734" x="0" y="0" width="1268.95" height="662.591" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_521_734" />
                    </filter>
                    <linearGradient id="paint0_linear_521_734" x1="200" y1="331.296" x2="1068.95" y2="331.296" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF0230" />
                        <stop offset="0.5" stopColor="#9943FC" />
                        <stop offset="1" stopColor="#3D7FFF" />
                    </linearGradient>
                </defs>
            </svg>
        </>
    )
}