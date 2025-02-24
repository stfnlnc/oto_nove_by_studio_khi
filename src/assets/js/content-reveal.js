export default function contentReveal(contents) {
    contents.forEach((content) => {
        setTimeout(() => {
            content.style.opacity = 1
        }, 500)
    })
}