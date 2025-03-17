import Column from "./Column.jsx";
import colors from "../assets/js/colors.js";
import getRandomColor from "../assets/js/get-random-color.js";
import moveColumnGradient from "../assets/js/move-column-gradient.js";
import preloader from "../assets/js/preloader.js";
import titleReveal from "../assets/js/title-reveal.js";
import contentReveal from "../assets/js/content-reveal.js";
import artists from "../assets/js/artists.js";
import {useEffect, useRef, useState} from "react";
import loader from "../assets/js/loader.js";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

export default function Grid() {
    const [randomColor, setRandomColor] = useState(0);
    const [firstColor] = useState(getRandomColor());
    const [translateY, setTranslateY] = useState("100%");
    const [translateX, setTranslateX] = useState({
        friday: "0",
        saturday: "0",
        sunday: "0",
        tickets: "0"
    });
    const [active, setActive] = useState({
        friday: false,
        saturday: false,
        sunday: false,
        tickets: false
    });
    const audioRef = useRef(null);
    const audioRefTransition = useRef(null);
    const playRef = useRef(null);
    const audioContextRef = useRef(null);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
            const filter = audioContextRef.current.createBiquadFilter();
            window.addEventListener('mousemove', (e) => {
                    filter.frequency.value = (e.clientX * 2) + 100;
                }
            );
            filter.Q.value = 1;
            source.connect(filter);
            filter.connect(audioContextRef.current.destination);
        }
    }, []);

    const playAudio = async () => {


        if (audioContextRef.current.state === "suspended") {
            await audioContextRef.current.resume();
        }
        setPlay(prevPlay => {
            if (!prevPlay) {
                audioRef.current.play();
                playRef.current.innerHTML = "Sound Off"
            } else {
                audioRef.current.pause();
                audioRef.current.load();
                playRef.current.innerHTML = "Sound On"
            }
            return !prevPlay;
        });
    };


    useEffect(() => {

        setRandomColor(firstColor);
        const columns = document.querySelectorAll(".column");
        const columnsGradient = document.querySelectorAll(".column__gradient");
        const titles = document.querySelectorAll(".column__title");
        const contents = document.querySelectorAll(".content");

        function resolveAfter2Seconds() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        }

        async function asyncCall() {
            preloader(columns);
            await resolveAfter2Seconds();
            setTranslateY("0");
        }

        asyncCall().then(() => {
            titleReveal(titles);
            contentReveal(contents);
            moveColumnGradient(columnsGradient);
            columnsGradient.forEach((col) => {
                col.classList.remove("pointer-events-none");
            });
            loader(document.querySelector("#loader"));
            gsap.to(playRef.current, {
                bottom: "1.4rem",
                duration: 3,
                ease: "power4.inOut"
            })
        });
    }, []);

    const handleClick = (day) => {
        audioRefTransition.current.pause();
        audioRefTransition.current.load();
        audioRefTransition.current.play();
        setActive((active) => {
            switch (day) {
                case "friday":
                    setRandomColor(
                        firstColor + 1 > colors.length - 1
                            ? firstColor + 1 - colors.length
                            : firstColor + 1
                    );
                    return {
                        friday:
                            (active.friday === false &&
                                active.saturday === false) ||
                            (active.friday === true &&
                                active.saturday === true),
                        saturday: false,
                        sunday: false,
                        tickets: false
                    };

                case "saturday":
                    setRandomColor(
                        firstColor + 2 > colors.length - 1
                            ? firstColor + 2 - colors.length
                            : firstColor + 2
                    );
                    return {
                        friday:
                            (active.friday === true &&
                                active.saturday === false) ||
                            (active.friday === false &&
                                active.saturday === false) ||
                            (active.saturday === true &&
                                active.sunday === true),
                        saturday:
                            (active.saturday === false &&
                                active.sunday === false) ||
                            (active.saturday === true &&
                                active.sunday === true),
                        sunday: false,
                        tickets: false
                    };

                case "sunday":
                    setRandomColor(
                        firstColor + 3 > colors.length - 1
                            ? firstColor + 3 - colors.length
                            : firstColor + 3
                    );
                    return {
                        friday:
                            (active.friday === true &&
                                active.saturday === false) ||
                            (active.friday === false &&
                                active.saturday === false) ||
                            (active.saturday === true &&
                                active.sunday === false) ||
                            (active.sunday === true && active.tickets === true),
                        saturday:
                            (active.saturday === false &&
                                active.sunday === false) ||
                            (active.saturday === true &&
                                active.sunday === false) ||
                            (active.sunday === true && active.tickets === true),
                        sunday:
                            (active.sunday === false &&
                                active.tickets === false) ||
                            (active.sunday === true && active.tickets === true),
                        tickets: false
                    };

                case "tickets":
                    setRandomColor(
                        firstColor + 4 > colors.length - 1
                            ? firstColor + 4 - colors.length
                            : firstColor + 4
                    );
                    return {
                        friday:
                            (active.friday === false &&
                                active.tickets === false) ||
                            (active.friday === true &&
                                active.tickets === false),
                        saturday:
                            (active.saturday === false &&
                                active.tickets === false) ||
                            (active.saturday === true &&
                                active.tickets === false),
                        sunday:
                            (active.sunday === false &&
                                active.tickets === false) ||
                            (active.sunday === true &&
                                active.tickets === false),
                        tickets: !active.tickets
                    };

                default:
                    return active;
            }
        });
    };

    useEffect(() => {
        const contentWidth = document.querySelector(".content").offsetWidth;
        setTranslateX({
            friday: active.friday ? `-${contentWidth}px` : "0",
            saturday: active.saturday ? `-${contentWidth}px` : "0",
            sunday: active.sunday ? `-${contentWidth}px` : "0",
            tickets: active.tickets ? `-${contentWidth}px` : "0"
        });
        if (
            active.friday ||
            active.saturday ||
            active.sunday ||
            active.tickets
        ) {
            audioRef.current.pause();
            audioRef.current.load();
        } else {
            play ? audioRef.current.play() : ''
        }
    }, [active]);

    useGSAP(() => {
        const loader = document.querySelector("#loader");
        if (
            active.friday ||
            active.saturday ||
            active.sunday ||
            active.tickets
        ) {
            gsap.to(loader, {
                x: "-100%",
                duration: 0.6
            });
        } else {
            gsap.to(loader, {
                x: "0",
                duration: 0.8,
                delay: 0.2
            });
            setRandomColor(firstColor);
        }
    }, [active]);

    const resetActive = () => {
        audioRefTransition.current.pause();
        audioRefTransition.current.load();
        audioRefTransition.current.play();
        setRandomColor(firstColor);
        setActive({
            friday: false,
            saturday: false,
            sunday: false,
            tickets: false
        });
    };

    return (
        <>
            <section className="flex flex-col items-center justify-center lg:hidden w-full h-[100lvh] uppercase text-black">
                <div>
                    Work in progress
                </div>
                <div>
                    Minimum display size 1024px
                </div>
            </section>
            <section
                className={
                    "hidden lg:grid grid-cols-17 w-full h-[100lvh] overflow-hidden"
                }
            >
                <Column
                    day={"home"}
                    onClick={resetActive}
                    translateY={translateY}
                    color={colors[randomColor][0]}
                ></Column>
                <Column
                    onClick={playAudio}
                    translateY={translateY}
                    color={colors[randomColor][1]}
                ></Column>
                <Column
                    translateY={translateY}
                    color={colors[randomColor][2]}
                ></Column>
                <Column
                    translateY={translateY}
                    color={colors[randomColor][3]}
                ></Column>
                <Column
                    translateY={translateY}
                    color={colors[randomColor][4]}
                ></Column>
                <Column
                    translateY={translateY}
                    color={colors[randomColor][5]}
                ></Column>
                <Column
                    className={"md:block lg:block"}
                    translateY={translateY}
                    color={colors[randomColor][6]}
                ></Column>
                <Column
                    className={"md:block lg:block"}
                    translateY={translateY}
                    color={colors[randomColor][7]}
                ></Column>
                <Column
                    className={"md:hidden lg:block"}
                    translateY={translateY}
                    color={colors[randomColor][8]}
                ></Column>
                <Column
                    className={"md:hidden lg:block"}
                    translateY={translateY}
                    color={colors[randomColor][9]}
                ></Column>
                <Column
                    className={"md:hidden lg:block"}
                    translateY={translateY}
                    color={colors[randomColor][10]}
                ></Column>
                <Column
                    className={"md:hidden lg:block"}
                    translateY={translateY}
                    color={colors[randomColor][11]}
                ></Column>
                <Column
                    className={"md:hidden lg:block"}
                    translateY={translateY}
                    color={colors[randomColor][12]}
                ></Column>
                <Column
                    active={active.friday}
                    date={"01.25 2025"}
                    content={
                        "les instants chavirés / 7, rue richard lenoir / 93100 montreuil"
                    }
                    artists={artists[0].friday}
                    day={"friday"}
                    onClick={() => handleClick("friday")}
                    menu={1}
                    translateX={translateX.friday}
                    translateY={translateY}
                    color={colors[randomColor][13]}
                >
                    Experience an evening where sound becomes a living,
                    breathing entity. Accompanied by contemplative light
                    projections, this night transforms the room into an
                    immersive canvas of sights and sounds.
                </Column>
                <Column
                    active={active.saturday}
                    date={"01.26 2025"}
                    content={"le petit bain / 7, Port de la Gare / 75013 Paris"}
                    artists={artists[0].saturday}
                    day={"saturday"}
                    onClick={() => handleClick("saturday")}
                    menu={2}
                    translateX={translateX.saturday}
                    translateY={translateY}
                    color={colors[randomColor][14]}
                >
                    Feel the pulse of the night with an electrifying journey
                    into electronic experimentation. From glitchy rhythms to
                    hypnotic basslines, this is no ordinary dance party—it’s a
                    playground for sonic innovators pushing the limits of
                    electronic sound.
                </Column>
                <Column
                    active={active.sunday}
                    date={"01.27 2025"}
                    content={
                        "lafayette anticipations / 9 Rue du Plâtre / 75004 Paris"
                    }
                    artists={artists[0].sunday}
                    day={"sunday"}
                    onClick={() => handleClick("sunday")}
                    menu={3}
                    translateX={translateX.sunday}
                    translateY={translateY}
                    color={colors[randomColor][15]}
                >
                    Close the festival with an exploration of sound during a
                    musical brunch like no other. It’s an auditory sanctuary
                    where the line between relaxation and artistic exploration
                    blurs, leaving space for reflection, connection, and the
                    gentle surprise of sound.
                </Column>
                <Column
                    active={active.tickets}
                    day={"tickets"}
                    content={"oto nove  / January 25 to 27, 2025 / paris"}
                    onClick={() => handleClick("tickets")}
                    menu={4}
                    translateX={translateX.tickets}
                    translateY={translateY}
                    color={colors[randomColor][16]}
                >
                    Oto Nove is a festival dedicated to improvised,
                    experimental, and noise music, uniting forward-thinking
                    artists and collectives from around the world. This edition
                    marks its debut in Marseille after previous installments in
                    Geneva and Berlin. In January 2025, Oto Nove will transform
                    venues like Les Instants Chavirés, Le Petit Bain and
                    Lafayette Anticipations into immersive stages for
                    avant-garde concerts, performances, and sound experiments.
                    Over three days, the festival invites audiences to
                    experience bold artistic expressions that push the
                    boundaries of sound, light, and space.
                </Column>
                <div
                    ref={playRef}
                    onClick={playAudio}
                    className={"fixed -bottom-full right-[1.94vw] cursor-pointer select-none label z-400 text-[1.25vw] uppercase px-[0.62vw] bg-white rounded-[0.375vw] border border-black whitespace-nowrap rotate-180"} style={{writingMode: 'vertical-lr'}}>Sound on
                </div>
                <audio ref={audioRef} src="/sounds/page.wav" loop></audio>
                <audio ref={audioRefTransition} src="/sounds/transition.wav"></audio>
            </section>
        </>
    );
}
