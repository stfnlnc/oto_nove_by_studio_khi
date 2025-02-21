import Column from "./Column.jsx";
import colors from "../assets/js/colors.js";
import getRandomColor from "../assets/js/get-random-color.js";
import moveColumnGradient from "../assets/js/move-column-gradient.js";
import preloader from "../assets/js/preloader.js";
import titleReveal from "../assets/js/title-reveal.js";
import {useEffect, useRef, useState} from "react";

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
            moveColumnGradient(columnsGradient)
        });


    }, [])

    const handleClick = (day) => {
        setActive(prevState => ({
            // Désactive tous les autres jours et active uniquement le jour cliqué
            friday: day === "friday" ? !prevState.friday : false,
            saturday: day === "saturday" ? !prevState.saturday : false,
            sunday: day === "sunday" ? !prevState.sunday : false,
            tickets: day === "tickets" ? !prevState.tickets : false
        }));
    }

    useEffect(() => {
        const contentWidth = document.querySelector('.content').offsetWidth
        setTranslateX({
            friday: active.friday ? `-${contentWidth}px` : "0",
            saturday: active.saturday ? `-${contentWidth}px` : "0",
            sunday: active.sunday ? `-${contentWidth}px` : "0",
            tickets: active.tickets ? `-${contentWidth}px` : "0"
        });
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
            <Column onClick={resetActive} translateY={translateY} color={colors[randomColor][0]}>Home</Column>
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
            <Column onClick={() => handleClick("friday")} menu={1} translateX={translateX.friday} translateY={translateY} color={colors[randomColor][13]}>Friday</Column>
            <Column onClick={() => handleClick("saturday")} menu={2} translateX={translateX.saturday} translateY={translateY} color={colors[randomColor][14]}>Saturday</Column>
            <Column onClick={() => handleClick("sunday")} menu={3} translateX={translateX.sunday} translateY={translateY} color={colors[randomColor][15]}>Sunday</Column>
            <Column onClick={() => handleClick("tickets")} menu={4} translateX={translateX.tickets} translateY={translateY} color={colors[randomColor][16]}>Tickets</Column>
        </section>
    </>)
}