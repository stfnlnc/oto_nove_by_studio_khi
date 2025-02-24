import Column from "./Column.jsx";
import colors from "../assets/js/colors.js";
import getRandomColor from "../assets/js/get-random-color.js";
import moveColumnGradient from "../assets/js/move-column-gradient.js";
import preloader from "../assets/js/preloader.js";
import titleReveal from "../assets/js/title-reveal.js";
import {useEffect, useState} from "react";
import contentReveal from "../assets/js/content-reveal.js";

export default function Grid() {
    const [randomColor, setRandomColor] = useState(0)
    const [translateY, setTranslateY] = useState('100%')
    const [translateX, setTranslateX] = useState({friday: "0", saturday: "0", sunday: "0", tickets: "0"})
    const [active, setActive] = useState({friday: false, saturday: false, sunday: false, tickets: false})

    useEffect(() => {
        setRandomColor(getRandomColor())
        const columns = document.querySelectorAll('.column')
        const columnsGradient = document.querySelectorAll('.column__gradient')
        const titles = document.querySelectorAll('.column__title')
        const contents = document.querySelectorAll('.content')

        function resolveAfter2Seconds() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        }

        async function asyncCall() {
            preloader(columns)
            await resolveAfter2Seconds();
            setTranslateY('0')
        }

        asyncCall().then(() => {
            titleReveal(titles)
            contentReveal(contents)
            moveColumnGradient(columnsGradient)
            columnsGradient.forEach(col => {
                col.classList.remove("pointer-events-none")
            })
        });
    }, [])

    const handleClick = (day) => {
        setActive(active => {
            switch (day) {
                case "friday":
                    return {
                        friday: (active.friday === false && active.saturday === false) || (active.friday === true && active.saturday === true),
                        saturday: false,
                        sunday: false,
                        tickets: false
                    };

                case "saturday":
                    return {
                        friday: (active.friday === true && active.saturday === false) || (active.friday === false && active.saturday === false) || (active.saturday === true && active.sunday === true),
                        saturday: (active.saturday === false && active.sunday === false) || (active.saturday === true && active.sunday === true),
                        sunday: false,
                        tickets: false
                    };

                case "sunday":
                    return {
                        friday: (active.friday === true && active.saturday === false) || (active.friday === false && active.saturday === false) || (active.saturday === true && active.sunday === false) || (active.sunday === true && active.tickets === true),
                        saturday: (active.saturday === false && active.sunday === false) || (active.saturday === true && active.sunday === false) || (active.sunday === true && active.tickets === true),
                        sunday: (active.sunday === false && active.tickets === false) || (active.sunday === true && active.tickets === true),
                        tickets: false
                    };

                case "tickets":
                    return {
                        friday: (active.friday === false && active.tickets === false) || (active.friday === true && active.tickets === false),
                        saturday: (active.saturday === false && active.tickets === false) || (active.saturday === true && active.tickets === false),
                        sunday: (active.sunday === false && active.tickets === false) || (active.sunday === true && active.tickets === false),
                        tickets: !active.tickets
                    };

                default:
                    return active;
            }
        });
    }

    useEffect(() => {
        const contentWidth = document.querySelector('.content').offsetWidth
        setTranslateX({
            friday: active.friday ? `-${contentWidth}px` : "0",
            saturday: active.saturday ? `-${contentWidth}px` : "0",
            sunday: active.sunday ? `-${contentWidth}px` : "0",
            tickets: active.tickets ? `-${contentWidth}px` : "0"
        });

        const loader = document.querySelector('.loader')
        if (active.friday || active.saturday || active.sunday || active.tickets) {
            loader.classList.add('opacity-0')
        } else {
            loader.classList.remove('opacity-0')
        }
    }, [active]);

    const resetActive = () => {
        setActive({
            friday: false,
            saturday: false,
            sunday: false,
            tickets: false
        });
    }


    return (<>
        <section className={"grid grid-cols-17 w-full h-[100lvh] overflow-hidden"}>
            <Column day={"home"} onClick={resetActive} translateY={translateY} color={colors[randomColor][0]}></Column>
            <Column translateY={translateY} color={colors[randomColor][1]}></Column>
            <Column translateY={translateY} color={colors[randomColor][2]}></Column>
            <Column translateY={translateY} color={colors[randomColor][3]}></Column>
            <Column translateY={translateY} color={colors[randomColor][4]}></Column>
            <Column translateY={translateY} color={colors[randomColor][5]}></Column>
            <Column translateY={translateY} color={colors[randomColor][6]}></Column>
            <Column translateY={translateY} color={colors[randomColor][7]}></Column>
            <Column translateY={translateY} color={colors[randomColor][8]}></Column>
            <Column translateY={translateY} color={colors[randomColor][9]}></Column>
            <Column translateY={translateY} color={colors[randomColor][10]}></Column>
            <Column translateY={translateY} color={colors[randomColor][11]}></Column>
            <Column translateY={translateY} color={colors[randomColor][12]}></Column>
            <Column date={"01.25 2025"} content={"les instants chavirés / 7, rue richard lenoir / 93100 montreuil"} day={"friday"} onClick={() => handleClick("friday")} menu={1} translateX={translateX.friday} translateY={translateY} color={colors[randomColor][13]}>
                Experience an evening where sound becomes a living, breathing entity. Accompanied by contemplative light projections, this night transforms the room into an immersive canvas of sights and sounds.
            </Column>
            <Column date={"01.26 2025"} content={"le petit bain / 7, Port de la Gare / 75013 Paris"} day={"saturday"} onClick={() => handleClick("saturday")} menu={2} translateX={translateX.saturday} translateY={translateY} color={colors[randomColor][14]}>
                Feel the pulse of the night with an electrifying journey into electronic experimentation. From glitchy rhythms to hypnotic basslines, this is no ordinary dance party—it’s a playground for sonic innovators pushing the limits of electronic sound.
            </Column>
            <Column date={"01.27 2025"} content={"lafayette anticipations / 9 Rue du Plâtre / 75004 Paris"} day={"sunday"} onClick={() => handleClick("sunday")} menu={3} translateX={translateX.sunday} translateY={translateY} color={colors[randomColor][15]}>
                Close the festival with an exploration of sound during a musical brunch like no other. It’s an auditory sanctuary where the line between relaxation and artistic exploration blurs, leaving space for reflection, connection, and the gentle surprise of sound.
            </Column>
            <Column day={"tickets"} content={"oto nove  / January 25 to 27, 2025 / paris"} onClick={() => handleClick("tickets")} menu={4} translateX={translateX.tickets} translateY={translateY} color={colors[randomColor][16]}>
                Oto Nove is a festival dedicated to improvised, experimental, and noise music, uniting forward-thinking artists and collectives from around the world. This edition marks its debut in Marseille after previous installments in Geneva and Berlin. In January 2025, Oto Nove will transform
                venues like Les Instants Chavirés, Le Petit Bain and Lafayette Anticipations into immersive stages for avant-garde concerts, performances, and sound experiments. Over three days, the festival invites audiences to experience bold artistic expressions that push the boundaries of sound,
                light, and space.
            </Column>
        </section>
    </>)
}