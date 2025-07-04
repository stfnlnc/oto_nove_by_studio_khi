import Content from "./Content.jsx";

export default function Column({
    color,
    children,
    translateX,
    translateY,
    menu,
    onClick,
    date,
    content,
    day,
    artists,
    className,
    active
}) {
    return (
        <>
            <div
                className={
                    "column relative w-full h-[100lvh] transition-transform duration-1000 z-10 " +
                    className
                }
                style={{
                    transform: `translate(${
                        translateX ? translateX : "0"
                    }, ${translateY})`
                }}
            >
                {day && (
                    <div
                        className={
                            "column__title absolute top-4 lg:top-[1.25vw] w-fit text-left left-1/2 uppercase text-xl xl:text-[1.25vw] text-white -rotate-180 z-30 -translate-x-1/2 transition-all duration-1000 pointer-events-none"
                        }
                        style={{
                            writingMode: "vertical-rl",
                            transform: "translate(-50%, 0)",
                            opacity: 0
                        }}
                    >
                        {day}
                    </div>
                )}
                <div
                    onClick={onClick}
                    className={
                        "column__gradient w-full h-[200lvh] transition-transform duration-1400 z-10 pointer-events-none" +
                        (day ? " cursor-pointer" : "")
                    }
                    style={{
                        background: color
                            ? `linear-gradient(to bottom, ${color[0]}, ${color[1]}, ${color[0]})`
                            : ""
                    }}
                ></div>
                {menu && (
                    <Content
                        active={active}
                        day={day}
                        artists={artists}
                        date={date}
                        content={content}
                        color={color}
                    >
                        {children}
                    </Content>
                )}
            </div>
        </>
    );
}
