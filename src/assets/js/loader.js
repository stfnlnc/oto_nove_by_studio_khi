import {gsap} from "gsap";
import {SplitText} from "gsap/SplitText";

export default function loader(loader) {
    gsap.registerPlugin(SplitText)

    const split = new SplitText(loader, {type: "chars"})
    gsap.to(split.chars, {
        transform: "translate(0, -65%)",
        ease: "power4.inOut",
        duration: 1.2,
        stagger: 0.08
    })
}