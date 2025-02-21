export default function titleReveal(titles) {
    titles.forEach((title, key) => {
        setTimeout(() => {
            title.style.transform = "translate(0, 0)"
            title.style.opacity = "1"
        }, 500 + (100 * key))
    })
}