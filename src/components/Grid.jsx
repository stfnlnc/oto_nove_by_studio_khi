import Column from "./Column.jsx";
import MenuLink from "./MenuLink.jsx";
import ContentLink from "./ContentLink.jsx";
import MenuLabel from "./MenuLabel.jsx";
import colors from "../assets/js/colors.js";
import getRandomColor from "../assets/js/get-random-color.js";
import moveColumnGradient from "../assets/js/move-column-gradient.js";
import preloader from "../assets/js/preloader.js";
import titleReveal from "../assets/js/title-reveal.js";
import contentReveal from "../assets/js/content-reveal.js";
import artists from "../assets/js/artists.js";
import { useEffect, useRef, useState } from "react";
import loader from "../assets/js/loader.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { fadeInAudio, fadeOutAudio } from "../assets/js/fade.js";

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
    const audioRefLow = useRef(null);
    const audioRefFriday = useRef(null);
    const audioRefSaturday = useRef(null);
    const audioRefSunday = useRef(null);
    const audioRefTickets = useRef(null);
    const audioRefHome = useRef(null);
    const audioRefLink = useRef(null);
    const playRef = useRef(null);
    const audioContextRef = useRef(null);
    const [play, setPlay] = useState(false);
    const canvasRef = useRef(null);
    const analyserRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext ||
                window.webkitAudioContext)();
            const source = audioContextRef.current.createMediaElementSource(
                audioRef.current
            );

            const filter = audioContextRef.current.createBiquadFilter();
            window.addEventListener("mousemove", (e) => {
                filter.frequency.value =
                    (e.clientX / window.innerWidth) * 300 * 6 + 10;
            });
            filter.Q.value = 1;

            // ✅ AnalyserNode
            const analyser = audioContextRef.current.createAnalyser();
            analyser.fftSize = 512;
            analyserRef.current = analyser;

            // ✅ Connect source → filter → analyser → destination
            source.connect(filter);
            filter.connect(analyser);
            analyser.connect(audioContextRef.current.destination);

            audioRef.current.volume = 0;

            draw(); // Lancer le visualizer

            const buyLinks = document.querySelectorAll(".buy-links");
            buyLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    if (!audioRef.current.paused) {
                        audioRef.current.pause();
                        audioRefLow.current.pause();
                        audioRefLink.current.play();
                        playRef.current.innerHTML = "Sound On";
                    }
                });
            });
        }
    }, []);

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);

            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cutoff = Math.floor(bufferLength * 0.5);
            const bassLimit = 0.3; // 30% du spectre
            const barWidth = (canvas.width / cutoff) * 10;
            let x = 0;

            for (let i = 0; i < cutoff; i++) {
                let barHeight = dataArray[i];

                // ✅ Limite les basses
                if (i <= cutoff * bassLimit) {
                    barHeight *= 0.5; // Ne jamais dépasser 50%
                }

                // ✅ Boost médiums uniquement
                if (i >= cutoff * 0.3 && i <= cutoff * 0.6) {
                    barHeight *= 2.0; // Boost médiums
                }

                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1.1;
            }
        };

        renderFrame();
    };

    const playAudio = async () => {
        if (audioContextRef.current.state === "suspended") {
            await audioContextRef.current.resume();
        }
        setPlay((prevPlay) => {
            if (!prevPlay) {
                audioRef.current.play();
                audioRefLow.current.play();
                if (
                    active.friday ||
                    active.saturday ||
                    active.sunday ||
                    active.tickets
                ) {
                    fadeInAudio(audioRefLow.current);
                    fadeOutAudio(audioRef.current);
                } else {
                    fadeInAudio(audioRef.current);
                }
                playRef.current.innerHTML = "Pause sound";
            } else {
                fadeOutAudio(audioRef.current);
                fadeOutAudio(audioRefLow.current);
                playRef.current.innerHTML = "Play sound";
            }
            return !prevPlay;
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const button = playRef.current;

        const resizeCanvas = () => {
            const buttonHeight = button.clientHeight;

            canvas.width = buttonHeight;
            canvas.height = containerRef.current.clientHeight;
        };

        resizeCanvas();

        // Observe la taille du bouton
        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(button);

        window.addEventListener("resize", resizeCanvas);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

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
            loader(document.querySelectorAll(".loader"));
            gsap.to(containerRef.current, {
                bottom: "1.4rem",
                duration: 3,
                ease: "power4.inOut"
            });
        });
    }, []);

    const handleClick = (day) => {
        setActive((active) => {
            if (play) {
                fadeInAudio(audioRefLow.current);
            }
            switch (day) {
                case "friday":
                    if (play) {
                        audioRefFriday.current.volume = 0.1;
                        audioRefFriday.current.play();
                    }
                    setRandomColor(
                        firstColor + 1 > colors.length - 1
                            ? firstColor + 1 - colors.length
                            : firstColor + 1
                    );
                    playRef.current.classList.add("text-white");
                    playRef.current.classList.add("border-white");
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
                    if (play) {
                        audioRefSaturday.current.volume = 0.1;
                        audioRefSaturday.current.play();
                    }
                    setRandomColor(
                        firstColor + 2 > colors.length - 1
                            ? firstColor + 2 - colors.length
                            : firstColor + 2
                    );
                    playRef.current.classList.add("text-white");
                    playRef.current.classList.add("border-white");
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
                    if (play) {
                        audioRefSunday.current.volume = 0.1;
                        audioRefSunday.current.play();
                    }
                    setRandomColor(
                        firstColor + 3 > colors.length - 1
                            ? firstColor + 3 - colors.length
                            : firstColor + 3
                    );
                    playRef.current.classList.add("text-white");
                    playRef.current.classList.add("border-white");
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
                    if (play) {
                        audioRefTickets.current.volume = 0.1;
                        audioRefTickets.current.play();
                    }
                    setRandomColor(
                        firstColor + 4 > colors.length - 1
                            ? firstColor + 4 - colors.length
                            : firstColor + 4
                    );
                    playRef.current.classList.remove("text-white");
                    playRef.current.classList.remove("border-white");
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

    const [translateMenu, setTranslateMenu] = useState("0");
    const [menuName, setMenuName] = useState("menu");
    const [activeMenu, setActiveMenu] = useState(false);

    useEffect(() => {
        const contentWidth = document.querySelector(".content").offsetWidth;
        setTranslateX({
            friday: active.friday ? `-${contentWidth}px` : "0",
            saturday: active.saturday ? `-${contentWidth}px` : "0",
            sunday: active.sunday ? `-${contentWidth}px` : "0",
            tickets: active.tickets ? `-${contentWidth}px` : "0"
        });
        if (!active.tickets) {
            playRef.current.classList.add("text-white");
            playRef.current.classList.add("border-white");
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
            gsap.to(".loader-container", {
                x: "-150%",
                duration: 0.8
            });
            fadeOutAudio(audioRef.current);
        } else {
            gsap.to(".loader-container", {
                x: "0",
                duration: 0.8,
                delay: 0.2
            });
            setRandomColor(firstColor);
            if (play) {
                fadeInAudio(audioRef.current);
                fadeOutAudio(audioRefLow.current);
            }
        }
    }, [active]);

    useEffect(() => {
        const containers = document.querySelectorAll(".label-container");
        const label = document.querySelector(".label");
        containers.forEach((container, key) => {
            container.addEventListener("mouseenter", () => {
                label.classList.remove("scale-0");
                label.innerText = container.dataset.content;
            });
            container.addEventListener("mouseleave", () => {
                label.classList.add("scale-0");
            });
            container.addEventListener("mousemove", (e) => {
                label.style.position = "fixed";
                label.style.left = e.pageX + "px";
                label.style.top = e.pageY + "px";
            });
        });
    }, []);

    const resetActive = () => {
        setRandomColor(firstColor);
        playRef.current.classList.add("text-white");
        playRef.current.classList.add("border-white");
        setActive({
            friday: false,
            saturday: false,
            sunday: false,
            tickets: false
        });
    };

    const resetMenu = () => {
        const menuMobile = document.getElementById("menu-mobile");
        const colMoves = document.querySelectorAll(".col-move");
        const days = document.querySelectorAll(
            "#friday, #saturday, #sunday, #tickets"
        );
        menuMobile.classList.remove("-translate-x-6/7");
        setActiveMenu(false);
        setTranslateMenu("0");
        setMenuName("menu");
        days.forEach((day) => {
            setTimeout(() => {
                day.classList.add("opacity-0");
                day.classList.add("pointer-events-none");
            }, 800);
        });
        colMoves.forEach((col) => {
            col.classList.remove("translate-x-[600%]");
        });
        gsap.to(".loader-container", {
            x: "0",
            duration: 0.8,
            delay: 0.2
        });
        setRandomColor(firstColor);
    };

    const handleMenu = (link, name) => {
        const menuMobile = document.getElementById("menu-mobile");
        const colMoves = document.querySelectorAll(".col-move");
        const days = document.querySelectorAll(
            "#friday, #saturday, #sunday, #tickets"
        );
        setActiveMenu((a) => !a);
        !activeMenu ? setTranslateMenu("-600%") : setTranslateMenu("0");
        !activeMenu ? setMenuName("close") : setMenuName("menu");
        menuMobile.classList.remove("-translate-x-6/7");
        if (!activeMenu) {
            setRandomColor(
                firstColor + 4 > colors.length - 1
                    ? firstColor + 4 - colors.length
                    : firstColor + 4
            );
            menuMobile.classList.add("-translate-x-6/7");
            gsap.to(".loader-container", {
                x: "-150%",
                duration: 0.8
            });
            colMoves.forEach((col) => {
                col.classList.remove("translate-x-[600%]");
            });
            days.forEach((day) => {
                setTimeout(() => {
                    day.classList.add("opacity-0");
                    day.classList.add("pointer-events-none");
                }, 500);
            });
        } else {
            if (!link) {
                gsap.to(".loader-container", {
                    x: "0",
                    duration: 0.8,
                    delay: 0.2
                });
                setRandomColor(firstColor);
            } else {
                colMoves.forEach((col) => {
                    col.classList.add("translate-x-[600%]");
                });
                const content = document.getElementById(name);
                content.classList.remove("opacity-0");
                content.classList.remove("pointer-events-none");
            }
        }
    };

    return (
        <>
            <section className="grid grid-cols-7 lg:hidden relative w-full h-[100svh] overflow-hidden uppercase text-black">
                <Column
                    day={"home"}
                    translateY={translateY}
                    onClick={resetMenu}
                    color={colors[randomColor][0]}
                ></Column>
                <Column
                    className={"col-move"}
                    translateY={translateY}
                    color={colors[randomColor][1]}
                ></Column>
                <Column
                    className={"col-move"}
                    translateY={translateY}
                    color={colors[randomColor][2]}
                ></Column>
                <Column
                    className={"col-move"}
                    translateY={translateY}
                    color={colors[randomColor][3]}
                ></Column>
                <Column
                    className={"col-move"}
                    translateY={translateY}
                    color={colors[randomColor][4]}
                ></Column>
                <Column
                    className={"col-move"}
                    translateY={translateY}
                    color={colors[randomColor][5]}
                ></Column>
                <Column
                    day={menuName}
                    onClick={() => {
                        handleMenu(false);
                    }}
                    translateY={translateY}
                    color={colors[randomColor][6]}
                    translateX={translateMenu}
                ></Column>
                <div
                    id="menu-mobile"
                    className="p-4 fixed top-0 left-full w-screen h-[100svh] bg-white z-20 transition-transform duration-1000"
                >
                    <div
                        className={
                            "flex flex-col gap-2 justify-start items-start h-full"
                        }
                    >
                        <MenuLink
                            onClick={() => {
                                handleMenu(true, "friday");
                            }}
                        >
                            Friday
                        </MenuLink>
                        <MenuLink
                            onClick={() => {
                                handleMenu(true, "saturday");
                            }}
                        >
                            Saturday
                        </MenuLink>
                        <MenuLink
                            onClick={() => {
                                handleMenu(true, "sunday");
                            }}
                        >
                            Sunday
                        </MenuLink>
                        <MenuLink
                            onClick={() => {
                                handleMenu(true, "tickets");
                            }}
                        >
                            Tickets & Infos
                        </MenuLink>
                        <MenuLabel className={"mt-auto"}>
                            Contemporary
                        </MenuLabel>
                        <MenuLabel>Music & Sounds</MenuLabel>
                        <MenuLabel>January 25 to 27, 2025</MenuLabel>
                    </div>
                </div>
                <div
                    id="friday"
                    className="pointer-events-none opacity-0 p-4 fixed top-0 left-1/2 -translate-x-1/2 w-5/7 h-[100svh] bg-white transition-transform duration-1000 flex flex-col"
                >
                    <MenuLabel
                        className={
                            "relative z-60 mix-blend-difference invert-[100] pointer-events-none"
                        }
                    >
                        Friday
                    </MenuLabel>
                    <div
                        className={
                            "relative z-60 galgo text-[11.25rem] leading-[70%] mt-8 border-b mb-8 mix-blend-difference invert-[100] pointer-events-none"
                        }
                    >
                        01.25. <br />
                        2025
                    </div>
                    <div className="relative z-60 mix-blend-difference invert-[100]">
                        <ContentLink href="/tickets">Buy Tickets</ContentLink>
                        <ContentLink href="/tickets">Buy Pass</ContentLink>
                    </div>
                    <div className="relative z-60 flex flex-col mt-auto text-[1.25rem] border-y border-black divide-y divide-black mix-blend-difference invert-[100] pointer-events-none">
                        <div>les instants chavirÉs</div>
                        <div>7, rue richard lenoir</div>
                        <div>93100 montreuil</div>
                    </div>
                    <div className="absolute top-0 left-0 z-50 w-full h-[100svh] overflow-y-auto">
                        <div className="h-[100svh]"></div>
                        <div className="relative flex flex-col gap-32 z-60">
                            {artists[0].friday.artists.map((artist) => (
                                <div key={artist.name} className="relative m-4">
                                    <img src={artist.image} alt="" />
                                    <div
                                        style={{
                                            backgroundColor:
                                                colors[randomColor][14][1]
                                        }}
                                        className={
                                            "absolute top-0 left-0 w-full h-full mix-blend-color p-4"
                                        }
                                    ></div>
                                    <MenuLabel
                                        className={
                                            "absolute bottom-6 left-1/2 -translate-x-1/2"
                                        }
                                    >
                                        {artist.name}
                                    </MenuLabel>
                                </div>
                            ))}
                        </div>
                        <div className="h-[50svh]"></div>
                    </div>
                </div>
                <div
                    id="saturday"
                    className="pointer-events-none opacity-0 p-4 fixed top-0 left-1/2 -translate-x-1/2 w-5/7 h-[100svh] bg-white z-5 transition-transform duration-1000 flex flex-col"
                >
                    <MenuLabel
                        className={
                            "relative z-60 mix-blend-difference invert-[100] pointer-events-none"
                        }
                    >
                        Saturday
                    </MenuLabel>
                    <div
                        className={
                            "relative z-60 galgo text-[11.25rem] leading-[70%] mt-8 border-b mb-8 mix-blend-difference invert-[100] pointer-events-none"
                        }
                    >
                        01.26. <br />
                        2025
                    </div>
                    <div className="relative z-60 mix-blend-difference invert-[100]">
                        <ContentLink href="/tickets">Buy Tickets</ContentLink>
                        <ContentLink href="/tickets">Buy Pass</ContentLink>
                    </div>
                    <div className="relative z-60 flex flex-col mt-auto text-[1.25rem] border-y border-black divide-y divide-black mix-blend-difference invert-[100] pointer-events-none">
                        <div>le petit bain</div>
                        <div>7, Port de la Garer</div>
                        <div>75013 Paris</div>
                    </div>
                    <div className="absolute top-0 left-0 z-50 w-full h-[100svh] overflow-y-auto">
                        <div className="h-[100svh]"></div>
                        <div className="relative flex flex-col gap-32 z-60">
                            {artists[0].saturday.artists.map((artist) => (
                                <div key={artist.name} className="relative m-4">
                                    <img src={artist.image} alt="" />
                                    <div
                                        style={{
                                            backgroundColor:
                                                colors[randomColor][14][1]
                                        }}
                                        className={
                                            "absolute top-0 left-0 w-full h-full mix-blend-color p-4"
                                        }
                                    ></div>
                                    <MenuLabel
                                        className={
                                            "absolute bottom-6 left-1/2 -translate-x-1/2"
                                        }
                                    >
                                        {artist.name}
                                    </MenuLabel>
                                </div>
                            ))}
                        </div>
                        <div className="h-[50svh]"></div>
                    </div>
                </div>
                <div
                    id="sunday"
                    className="pointer-events-none opacity-0 p-4 fixed top-0 left-1/2 -translate-x-1/2 w-5/7 h-[100svh] bg-white z-5 transition-transform duration-1000 flex flex-col"
                >
                    <MenuLabel
                        className={
                            "relative z-60 mix-blend-difference invert-[100] pointer-events-none"
                        }
                    >
                        Sunday
                    </MenuLabel>
                    <div
                        className={
                            "relative z-60 galgo text-[11.25rem] leading-[70%] mt-8 border-b mb-8 mix-blend-difference invert-[100] pointer-events-none"
                        }
                    >
                        01.27. <br />
                        2025
                    </div>
                    <div className="relative z-60 mix-blend-difference invert-[100]">
                        <ContentLink href="/tickets">Buy Tickets</ContentLink>
                        <ContentLink href="/tickets">Buy Pass</ContentLink>
                    </div>
                    <div className="relative z-60 flex flex-col mt-auto text-[1.25rem] border-y border-black divide-y divide-black mix-blend-difference invert-[100] pointer-events-none">
                        <div>lafayette anticipations</div>
                        <div>9 Rue du Plâtre</div>
                        <div>75004 Paris</div>
                    </div>
                    <div className="absolute top-0 left-0 z-50 w-full h-[100svh] overflow-y-auto">
                        <div className="h-[100svh]"></div>
                        <div className="relative flex flex-col gap-32 z-60">
                            {artists[0].sunday.artists.map((artist) => (
                                <div key={artist.name} className="relative m-4">
                                    <img src={artist.image} alt="" />
                                    <div
                                        style={{
                                            backgroundColor:
                                                colors[randomColor][14][1]
                                        }}
                                        className={
                                            "absolute top-0 left-0 w-full h-full mix-blend-color p-4"
                                        }
                                    ></div>
                                    <MenuLabel
                                        className={
                                            "absolute bottom-6 left-1/2 -translate-x-1/2"
                                        }
                                    >
                                        {artist.name}
                                    </MenuLabel>
                                </div>
                            ))}
                        </div>
                        <div className="h-[50svh]"></div>
                    </div>
                </div>
                <div
                    id="tickets"
                    className="pointer-events-none overflow-y-auto opacity-0 p-4 fixed top-0 left-1/2 -translate-x-1/2 w-5/7 h-[100svh] bg-white z-5 transition-transform duration-1000 flex flex-col"
                >
                    <ContentLink href="/tickets">Buy Tickets</ContentLink>
                    <ContentLink href="/tickets">Buy Pass</ContentLink>
                    <div className="relative z-60 flex flex-col mt-24 text-[1.25rem] border-y border-black divide-y divide-black">
                        <div>oto nove fest</div>
                        <div>January 25 to 27, 2025</div>
                        <div>Paris</div>
                    </div>
                    <p className="my-4 normal-case text-[1.25rem] leading-tight">
                        Oto Nove is an experimental website inspired by a
                        festival dedicated to improvised, experimental, and
                        noise music. Imagined as a bold, immersive event, it
                        brings together avant-garde artists and collectives from
                        around the world. Oto Nove reimagines venues like Les
                        Instants Chavirés, Le Petit Bain, and Lafayette
                        Anticipations as stages for concerts, performances, and
                        sound experiments. The festival invites audiences to
                        explore the intersections of sound, light, and space,
                        blending visual codes with the aesthetics of
                        experimental music scenes.
                    </p>
                    <p className="pt-4 normal-case border-t border-black text-[1.25rem] leading-tight">
                        This project is a playground for graphic and interactive
                        exploration, where all content is entirely fictitious.
                        It serves as a conceptual space to test visual systems,
                        interaction patterns, and creative boundaries in digital
                        design.
                        <br />
                        <br />
                        Design by{" "}
                        <a
                            target="_blank"
                            className="underline underline-offset-4"
                            href="https://cynthiajego.com"
                        >
                            Cynthia Jego
                        </a>
                        .
                        <br />
                        Code by{" "}
                        <a
                            target="_blank"
                            className="underline underline-offset-4"
                            href="https://studiokhi.com"
                        >
                            Studio Khi
                        </a>
                        .
                    </p>
                </div>
                <div className="fixed z-10 flex flex-row bottom-4 right-4 w-fit h-fit">
                    <div
                        className={
                            "text-center cursor-pointer w-fit select-none z-400 text-[1rem] uppercase px-[0.62rem] bg-transparent rounded-[0.375rem] border text-white border-white hover:bg-white hover:text-black transition-colors duration-1000 whitespace-nowrap rotate-180"
                        }
                        style={{ writingMode: "vertical-lr" }}
                    >
                        Sound experience only on desktop
                    </div>
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
                    content={"oto nove fest / January 25 to 27, 2025 / paris"}
                    onClick={() => handleClick("tickets")}
                    menu={4}
                    translateX={translateX.tickets}
                    translateY={translateY}
                    color={colors[randomColor][16]}
                >
                    Oto Nove is an experimental website inspired by a festival
                    dedicated to improvised, experimental, and noise music.
                    Imagined as a bold, immersive event, it brings together
                    avant-garde artists and collectives from around the world.
                    Oto Nove reimagines venues like Les Instants Chavirés, Le
                    Petit Bain, and Lafayette Anticipations as stages for
                    concerts, performances, and sound experiments. The festival
                    invites audiences to explore the intersections of sound,
                    light, and space, blending visual codes with the aesthetics
                    of experimental music scenes.
                    <div className="w-full py-5 mb-5 border-b border-black"></div>
                    This project is a playground for graphic and interactive
                    exploration, where all content is entirely fictitious. It
                    serves as a conceptual space to test visual systems,
                    interaction patterns, and creative boundaries in digital
                    design. Design by Cynthia Jego. Code by Studio Khi. <br />
                    <br />
                    Design by{" "}
                    <a
                        className={
                            "underline underline-offset-4 pointer-events-auto select-none"
                        }
                        href="https://cynthiajego.com"
                        target={"_blank"}
                    >
                        Cynthia Jego
                    </a>
                    <br />
                    Code by{" "}
                    <a
                        className={
                            "underline underline-offset-4 pointer-events-auto select-none"
                        }
                        href="https://studiokhi.com"
                        target={"_blank"}
                    >
                        Studio Khi
                    </a>
                    . <br />
                    Original Soundtrack by Stefan Lancelot.
                </Column>

                <div
                    ref={containerRef}
                    className="fixed -bottom-full right-[1.94vw] z-400 flex flex-row w-fit h-fit"
                >
                    <canvas
                        className="-rotate-90"
                        ref={canvasRef}
                        style={{ display: "block" }}
                    />
                    <div
                        ref={playRef}
                        onClick={playAudio}
                        className={
                            "text-center h-[10vw] cursor-pointer w-fit select-none z-400 text-[1.25vw] uppercase px-[0.62vw] bg-transparent rounded-[0.375vw] border text-white border-white hover:bg-white hover:text-black transition-colors duration-1000 whitespace-nowrap rotate-180"
                        }
                        style={{ writingMode: "vertical-lr" }}
                    >
                        Play sound
                    </div>
                </div>
                <audio ref={audioRef} src="/sounds/loop.wav" loop></audio>
                <audio
                    ref={audioRefLow}
                    src="/sounds/loop-low.wav"
                    loop
                ></audio>
                <audio ref={audioRefFriday} src="/sounds/open.wav"></audio>
                <audio ref={audioRefSaturday} src="/sounds/open.wav"></audio>
                <audio ref={audioRefSunday} src="/sounds/open.wav"></audio>
                <audio ref={audioRefTickets} src="/sounds/open.wav"></audio>
                <audio ref={audioRefHome} src="/sounds/open.wav"></audio>
                <audio ref={audioRefLink} src="/sounds/crash.wav"></audio>
            </section>
        </>
    );
}
