import Buy from "./Buy.jsx";
import Lenis from 'lenis'
import {useEffect, useRef} from "react";
import Label from "./Label.jsx";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default function Content({date, content, children, artists, color, day}) {

    const scrollRef = useRef(null);

    useEffect(() => {
        const containers = document.querySelectorAll('.label-container')
        const labels = document.querySelectorAll('.label')

        containers.forEach((container, key) => {
            container.addEventListener('mouseenter', () => {
                labels[key].classList.remove("opacity-0")
            })
            container.addEventListener('mouseleave', () => {
                labels[key].classList.add("opacity-0")
            })
            container.addEventListener('mousemove', (e) => {
                labels[key].style.left = e.clientX - container.getBoundingClientRect().left + "px"
                labels[key].style.top = e.clientY - container.getBoundingClientRect().top - labels[key].clientHeight + "px"
            })
        })
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: scrollRef.current,
            content: scrollRef.current.children[0],
            smooth: true,
            wheelMultiplier: 0.8,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const contents = document.querySelectorAll('.content')

        contents.forEach(content => {
            const images = content.querySelectorAll('.image')
            const clips = content.querySelectorAll('.clip')
            images.forEach((image, key) => {
                const rects = clips[key].querySelectorAll('rect')
                gsap.to(image, {
                    scrollTrigger: {
                        trigger: image,
                        start: "top 80%",
                        end: "bottom center",
                        markers: false,
                        scroller: content,
                        onEnter: () => {
                            gsap.to(rects, {
                                y: "-100%",
                                ease: "expo.inOut",
                                duration: 2,
                                stagger: {
                                    from: "center",
                                    each: 0.1,
                                    ease: "sine.out",
                                }
                            })
                        },
                        onLeaveBack: () => {
                            gsap.to(rects, {
                                y: "0",
                                ease: "expo.inOut",
                                duration: 1.4,
                                stagger: {
                                    from: "edges",
                                    each: 0.1,
                                    ease: "sine.out",
                                }
                            })
                        }
                    }
                })
            })
        })


    }, [scrollRef])

    return (<>
        <div className={"grid grid-cols-17 w-screen h-[100lvh] absolute top-0 left-full z-50 bg-white"}>
            <div ref={scrollRef} className="content col-span-12 p-5 overflow-y-scroll">
                {date && <div className="label-container relative flex flex-row items-start justify-between border-b border-black pt-5 mb-5">
                    <Label>{day}</Label>
                    {date.split(" ").map(textDate => <div key={textDate} className={"galgo text-[22vw] leading-[65%]"}>{textDate}</div>)}
                </div>}
                <div className={"sticky top-0 h-[80lvh] flex flex-row items-start justify-start gap-[5vw] pb-5 z-50 mix-blend-difference invert-[100] pointer-events-none"}>
                    <div className={"flex flex-col gap-0 shrink-0 pointer-events-auto"}>
                        <Buy href={""}>Buy tickets</Buy>
                        <Buy href={""}>Buy pass</Buy>
                    </div>
                    <div className={"flex flex-col text-[1.8vw] uppercase w-full leading-[100%]"}>
                        {content && content.split(" / ").map((textContent, key) => <div key={key} className={"border-b border-black w-full pb-2 mb-2"}>{textContent}</div>)}
                        <div className={"normal-case text-[1.6vw] leading-[120%] py-5"}>
                            {children}
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col gap-48">
                    {artists && artists.artists.map((artist) => (
                        <div className={"h-fit relative z-10 pointer-events-none px-[4vw]"} key={artist.id}>
                            <div className={"flex flex-row image-reveal relative w-full h-full pointer-events-none " + (artist.id % 2 === 0 ? "justify-start" : "justify-end")}>
                                <div className={"label-container relative w-[26vw] bg-white pointer-events-auto"}>
                                    <img className={"image h-auto object-cover object-center w-[26vw]"} src={artist.image} alt=""/>
                                    <div style={{backgroundColor: color[1]}} className={"absolute top-0 left-0 w-[26vw] h-full mix-blend-color"}></div>
                                    <Label>{artist.name}</Label>
                                    <svg className="clip absolute -top-px left-0 w-full h-full z-100 scale-105" xmlns="http://www.w3.org/2000/svg">
                                        <rect className="fill-white" x="0%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="10%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="20%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="30%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="40%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="50%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="60%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="70%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="80%" y="0" width="10.3%" height="100%"/>
                                        <rect className="fill-white" x="90%" y="0" width="10.3%" height="100%"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}