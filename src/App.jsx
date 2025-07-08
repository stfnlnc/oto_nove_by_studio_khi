import Home from "./Home.jsx";
import Label from "./components/Label.jsx";
import { Route, Routes } from "react-router";
import NotFound from "./NotFound.jsx";
import Tickets from "./Tickets.jsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function App() {
    useGSAP(() => {
        const links = document.querySelectorAll(".buy-links, .back-home");
        const transitions = document.querySelectorAll(".transitions");
        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                gsap.to(transitions, {
                    y: 0,
                    stagger: {
                        each: 0.05,
                        from: "center",
                        grid: "auto",
                        ease: "power4.inOut"
                    }
                });
                setTimeout(() => {
                    window.location = link.href;
                }, 2000);
            });
        });
    }, []);

    return (
        <>
            <Label className="label"></Label>
            <div className="fixed top-0 left-0 w-full h-[100lvh] z-500 grid grid-cols-7 lg:grid-cols-17 pointer-events-none">
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
                <div className="w-full h-[100lvh] bg-white transitions translate-y-full"></div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
