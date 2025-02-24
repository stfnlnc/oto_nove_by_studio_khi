export default function loader(loader) {
    let loading = 0
    let loaderInterval = setInterval(() => {
        if (loading < 10) {
            loading = loading + 1
            loader.firstChild.innerHTML = loading
        } else {
            clearInterval(loaderInterval)
        }
    }, 150)
    setTimeout(() => {
        loader.firstChild.classList.add("opacity-0")
        loader.lastChild.classList.add("opacity-0")
        loader.childNodes[1].lastChild.classList.remove("opacity-0")
        setTimeout(() => {
            loader.style.transform = `translate(-${loader.firstChild.clientWidth}px, 0)`
        }, 300)
    }, 2500)
}