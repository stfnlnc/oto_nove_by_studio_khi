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
            <div className={"block"}>
                <div className="fixed bottom-[1vw] left-[1vw] leading-[55%] pt-12 text-[11.25rem] lg:text-[22vw] galgo uppercase z-300 text-white">
                    Sold Out
                </div>
                <a
                    href="/"
                    className={
                        "back-home fixed bottom-[1vw] right-[1.94vw] cursor-pointer select-none label z-400 text-[1.25rem] lg:text-[1.25vw] uppercase px-[0.62rem] py-[0.36rem] lg:py-0 lg:px-[0.62vw] bg-transparent rounded-[0.375rem] lg:rounded-[0.375vw] border text-white border-white hover:text-black hover:bg-white transition-colors duration-300 whitespace-nowrap rotate-180"
                    }
                    style={{ writingMode: "vertical-lr" }}
                >
                    Back Home
                </a>
                <section
                    className={
                        "grid grid-cols-7 lg:grid-cols-17 w-full h-[100lvh] overflow-hidden"
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
