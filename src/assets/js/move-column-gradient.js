export default function moveColumnGradient(columns) {
    const isReduced =
        window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    columns.forEach((column) => {
        if (!isReduced) {
            column.addEventListener("mouseenter", () => {
                column.style.transform = "translate(0, -50%)";
                setTimeout(() => {
                    column.style.transform = "translate(0, 0)";
                }, 800);
            });
        }
    });
}
