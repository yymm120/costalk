'use client'
import './styles.css';
import { redirect } from 'next/navigation';




export default function Main() {
    redirect('/recommend')
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