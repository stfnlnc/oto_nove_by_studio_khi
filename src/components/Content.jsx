import Buy from "./Buy.jsx";
import Lenis from 'lenis'
import {useEffect, useRef} from "react";
import Label from "./Label.jsx";

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
            wheelMultiplier: 0.5,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (<>
        <div className={"grid grid-cols-17 w-screen h-[100lvh] absolute top-0 left-full z-50 bg-white"}>
            <div ref={scrollRef} className="content col-span-12 p-5 overflow-y-scroll">
                {date && <div className="label-container relative flex flex-row items-start justify-between border-b border-black pt-5">
                    <Label>{day}</Label>
                    {date.split(" ").map(textDate => <div key={textDate} className={"galgo text-[22vw] leading-[65%]"}>{textDate}</div>)}
                </div>}
                <div className={"sticky top-0 h-[80lvh] flex flex-row items-start justify-start gap-[5vw] py-5 z-50 mix-blend-difference invert-[100] pointer-events-none"}>
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
                <div className="relative">
                    {artists && artists.artists.map((artist) => (
                        <div className={"h-[40lvh] relative z-10"} key={artist.id}>
                            <div className={"label-container absolute top-1/2 -translate-y-1/2 w-[22vw] h-auto " + (artist.id % 2 === 0 ? "left-[5.5vw]" : "right-[5.5vw]")}>
                                <img className={"w-full h-full object-cover object-center"} src={artist.image} alt=""/>
                                <div style={{backgroundColor: color[1]}} className={"absolute top-0 left-0 w-full h-full mix-blend-color"}></div>
                                <Label>{artist.name}</Label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}