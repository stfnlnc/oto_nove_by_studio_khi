import getRandomNumber from "./get-random-number.js";

export default function preloader(columns) {
    columns.forEach((column, index) => {
        setTimeout(() => {
            column.style.transform = 'translate(0, 0)'
        }, 300 + (100 * getRandomNumber(15)))
    })
}