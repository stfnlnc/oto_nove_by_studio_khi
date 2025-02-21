import colors from "./colors.js";

export default function getRandomColor() {
    return Math.floor(Math.random() * (colors.length));
}