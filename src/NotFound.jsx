import "./App.css";
import Column from "./components/Column.jsx";
import colors from "./assets/js/colors.js";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import getRandomNumber from "./assets/js/get-random-number.js";

function NotFound() {
    const [randomColor, setRandomColor] = useState(0);

    useEffect(() => {
        setRandomColor(1);
    }, []);

    useGSAP(() => {
        const columns = document.querySelectorAll(".equalizer");
        gsap.to(columns, {
            y: -window.innerHeight / 1.5,
            stagger: {
                each: 0.06,
                from: "edges",
                grid: "auto",
                ease: "power1.inOut"
            }
        });
        columns.forEach((column) => {
            gsap.to(column, {
                yPercent: 10 + getRandomNumber(20),
                yoyo: true,
                repeat: -1,
                ease: "power4.inOut",
                duration: getRandomNumber(10) * 0.1 + 0.8,
                delay: getRandomNumber(10) * 0.1 + 0.1
            });
        });
    }, []);

    return (
        <>
            <section className="grid grid-cols-10 lg:hidden w-full h-[100lvh] overflow-hidden uppercase text-black">
                <Column color={colors[randomColor][0]}></Column>
                <div className="col-span-8">
                    <div className="flex flex-col items-start justify-center w-full h-[100lvh] uppercase p-5 text-3xl sm:text-5xl">
                        <div className={"border-y w-full"}>Responsive</div>
                        <div className={"border-b w-full"}>In progress</div>
                        <div
                            className={
                                "text-xl sm:text-2xl normal-case mt-5 sm:w-72"
                            }
                        >
                            Please use a desktop or laptop for a better
                            experience.
                        </div>
                    </div>
                </div>
                <Column color={colors[randomColor][1]}></Column>
            </section>
            <div className={"hidden lg:block"}>
                <div className="fixed bottom-[1vw] left-[1vw] leading-[55%] pt-12 text-[22vw] galgo uppercase z-300 text-white">
                    Sold Out
                </div>
                <a
                    href="/"
                    className={
                        "back-home fixed bottom-[1vw] right-[1.94vw] cursor-pointer select-none label z-400 text-[1.25vw] uppercase px-[0.62vw] bg-white rounded-[0.375vw] border border-black whitespace-nowrap rotate-180"
                    }
                    style={{ writingMode: "vertical-lr" }}
                >
                    Back Home
                </a>
                <section
                    className={
                        "hidden lg:grid grid-cols-17 w-full h-[100lvh] overflow-hidden"
                    }
                >
                    {Array.from({ length: 17 }, (_, i) => (
                        <div key={i} className={"equalizer"}>
                            <Column
                                translateX={0}
                                translateY={"100%"}
                                key={i}
                                color={colors[randomColor][i]}
                            />
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}

export default NotFound;
