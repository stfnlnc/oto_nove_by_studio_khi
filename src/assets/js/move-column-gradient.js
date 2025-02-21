export default function moveColumnGradient(columns) {
    columns.forEach((column) => {
        column.addEventListener('mouseenter', () => {
            column.style.transform = 'translate(0, -50%)'
            setTimeout(() => {
                column.style.transform = 'translate(0, 0)'
            }, 800)
        })
    })
}