import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import "../index.css"
import getRandomNumber from "../assets/js/get-random-number.js";

export default function Test() {

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const images = document.querySelectorAll('img')
        const clips = document.querySelectorAll('.clip')

        images.forEach((image, key) => {
            const rects = clips[key].querySelectorAll('rect')
            gsap.to(image, {
                scrollTrigger: {
                    trigger: image,
                    start: "top center",
                    end: "bottom center",
                    markers: true,
                    onEnter: () => {
                        gsap.to(rects, {
                            y: "-100%",
                            ease: "power4.inOut",
                            stagger: {
                                from: "center",
                                each: 0.06,
                                ease: "linear"
                            }
                        })
                    },
                    onLeaveBack: () => {
                        gsap.to(rects, {
                            y: "0",
                            ease: "power4.inOut",
                            stagger: {
                                from: "center",
                                each: 0.06,
                                ease: "linear"
                            }
                        })
                    }
                }
            })
        })

    })

    return (<>
        <div className="flex flex-col gap-4">
            <div className="h-[200lvh] flex flex-col items-center justify-center">
                <div className="relative overflow-hidden">
                    <img className="trigger" src='https://images.unsplash.com/photo-1497910091122-9f8a7746eb33?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODk5NTYxNjl8&ixlib=rb-4.0.3&q=85' alt=''/>
                    <svg className="clip absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <rect className="fill-white" x="0%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="10%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="20%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="30%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="40%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="50%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="60%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="70%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="80%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="90%" y="0" width="10%" height="100%"/>
                        <rect className="fill-white" x="90%" y="0" width="10%" height="100%"/>
                    </svg>
                </div>
            </div>
        </div>
    </>)
}