import Buy from "./Buy.jsx";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Content({
  date,
  content,
  children,
  artists,
  color,
  day,
  active,
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current.children[0],
      smooth: true,
      wheelMultiplier: 0.8,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const contents = document.querySelectorAll(".content");

    contents.forEach((content, key) => {
      const images = content.querySelectorAll(".image");
      const clips = content.querySelectorAll(".clip");
      images.forEach((image, key) => {
        const rects = clips[key].querySelectorAll("rect");
        gsap.to(image, {
          scrollTrigger: {
            trigger: image,
            start: "top 90%",
            end: "bottom 90%",
            markers: false,
            scroller: content,
            onEnter: () => {
              gsap.to(rects, {
                y: "-100%",
                ease: "expo.inOut",
                duration: 2,
                stagger: {
                  from: "center",
                  each: 0.1,
                  ease: "sine.out",
                },
              });
            },
            onLeaveBack: () => {
              gsap.to(rects, {
                y: "0",
                ease: "expo.inOut",
                duration: 1.4,
                stagger: {
                  from: "center",
                  each: 0.1,
                  ease: "sine.out",
                },
              });
            },
          },
        });
      });
      const reflects1 = document.querySelectorAll(".reflect-1");
      const reflects2 = document.querySelectorAll(".reflect-2");
      const reflects3 = document.querySelectorAll(".reflect-3");
      if (reflects1[key] && reflects2[key] && reflects3[key]) {
        gsap.to(reflects1[key], {
          y: "3rem",
          duration: 1.2,
          scrollTrigger: {
            trigger: reflects1[key],
            scroller: content,
            start: "top top",
            end: "bottom top",
            markers: false,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(reflects2[key], {
          y: "5rem",
          duration: 1.2,
          scrollTrigger: {
            trigger: reflects2[key],
            scroller: content,
            start: "top top",
            end: "bottom top",
            markers: false,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(reflects3[key], {
          y: "6.5rem",
          duration: 1.2,
          scrollTrigger: {
            trigger: reflects3[key],
            scroller: content,
            start: "top top",
            end: "bottom top",
            markers: false,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });
  }, [scrollRef]);

  return (
    <>
      <div
        className={
          "grid grid-cols-17 w-screen h-[100lvh] absolute top-0 left-full z-50 bg-white"
        }
      >
        <div
          ref={scrollRef}
          className="p-5 overflow-y-scroll content md:col-span-7 lg:col-span-12"
        >
          {date && (
            <div
              data-content={day}
              className="relative mb-5 border-b border-black label-container pb-25"
            >
              <div
                className="relative z-30 flex flex-row items-start justify-between pt-5 bg-white"
                style={{ clipPath: "inset(0% 0% 10% 0%)" }}
              >
                {date.split(" ").map((textDate) => (
                  <div
                    key={textDate + 0}
                    className={"galgo text-[30vw] leading-[70%]"}
                  >
                    {textDate}
                  </div>
                ))}
              </div>
              <div
                className="absolute top-0 left-0 z-20 flex flex-row items-start justify-between w-full pt-5 bg-white reflect-1"
                style={{ clipPath: "inset(0% 0% 10% 0%)" }}
              >
                {date.split(" ").map((textDate) => (
                  <div
                    key={textDate + 1}
                    className={"galgo text-[30vw] leading-[70%]"}
                  >
                    {textDate}
                  </div>
                ))}
              </div>
              <div
                className="absolute top-0 left-0 z-10 flex flex-row items-start justify-between w-full pt-5 bg-white reflect-2"
                style={{ clipPath: "inset(0% 0% 10% 0%)" }}
              >
                {date.split(" ").map((textDate) => (
                  <div
                    key={textDate + 2}
                    className={"galgo text-[30vw] leading-[70%]"}
                  >
                    {textDate}
                  </div>
                ))}
              </div>
              <div
                className="absolute top-0 left-0 flex flex-row items-start justify-between w-full pt-5 bg-white reflect-3 z-5"
                style={{ clipPath: "inset(0% 0% 10% 0%)" }}
              >
                {date.split(" ").map((textDate) => (
                  <div
                    key={textDate + 3}
                    className={"galgo text-[30vw] leading-[70%]"}
                  >
                    {textDate}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div
            className={
              "sticky top-0 h-[80lvh] flex flex-row items-start justify-start gap-[5vw] pb-5 pointer-events-none mix-blend-difference invert-[100] z-50"
            }
          >
            <div className={"flex flex-col gap-0 shrink-0 pointer-events-auto"}>
              <Buy href={""}>Buy tickets</Buy>
              <Buy href={""}>Buy pass</Buy>
            </div>
            <div
              className={
                "flex flex-col text-[1.8vw] uppercase w-full leading-[100%]"
              }
            >
              {content &&
                content.split(" / ").map((textContent, key) => (
                  <div
                    key={key}
                    className={"border-b border-black w-full pb-2 mb-2"}
                  >
                    {textContent}
                  </div>
                ))}
              <div className={"normal-case text-[1.6vw] leading-[120%] py-5"}>
                {children}
              </div>
            </div>
          </div>
          <div className="relative flex flex-col gap-48">
            {artists &&
              artists.artists.map((artist) => (
                <div
                  className={"h-fit relative z-10 pointer-events-none px-[4vw]"}
                  key={artist.id}
                >
                  <div
                    className={
                      "flex flex-row image-reveal relative w-full h-full pointer-events-none " +
                      (artist.id % 2 === 0 ? "justify-start" : "justify-end")
                    }
                  >
                    <div
                      data-content={artist.name}
                      className={
                        "label-container relative w-[26vw] bg-white pointer-events-auto"
                      }
                    >
                      <img
                        className={
                          "image h-auto object-cover object-center w-[26vw]"
                        }
                        src={artist.image}
                        alt=""
                      />
                      <div
                        style={{
                          backgroundColor: color[1],
                        }}
                        className={
                          "absolute top-0 left-0 w-[26vw] h-full mix-blend-color"
                        }
                      ></div>
                      <svg
                        className="absolute left-0 w-full h-full scale-105 clip -top-px z-100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          className="fill-white"
                          x="0%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="10%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="20%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="30%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="40%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="50%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="60%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="70%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="80%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                        <rect
                          className="fill-white"
                          x="90%"
                          y="0"
                          width="10.3%"
                          height="100%"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
