import { gsap } from "gsap";

export default function loader(loaders) {
    gsap.fromTo(
        loaders,
        {
            clipPath: "inset(100% 0% 0% 0%)"
        },
        {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.inOut",
            stagger: 0.4
        }
    );
}
