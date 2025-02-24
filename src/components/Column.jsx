import Content from "./Content.jsx";

export default function Column({
                                   color,
                                   children,
                                   translateX,
                                   translateY,
                                   menu, onClick,
                                   date,
                                   content,
                                   day,
                                   artists
                               }) {
    return (<>
        <div className={"column relative w-full h-[100lvh] transition-transform duration-1000 z-10"} style={{transform: `translate(${translateX ? translateX : "0"}, ${translateY})`}}>
            {day &&
                <div className={"column__title absolute top-18 w-32 text-right left-1/2 uppercase text-[1.25vw] text-white -rotate-90 z-30 -translate-x-1/2 transition-all duration-1000 pointer-events-none"} style={{transform: 'translate(-50%, 0)', opacity: 0}}>
                    {day}
                </div>
            }
            <div onClick={onClick} className={"column__gradient w-full h-[200lvh] transition-transform duration-1400 z-10 pointer-events-none" + (day ? " cursor-pointer" : "")} style={{background: color ? `linear-gradient(to bottom, ${color[0]}, ${color[1]}, ${color[0]})` : ""}}></div>
            {menu && <Content artists={artists} date={date} content={content} color={color}>{children}</Content>}
        </div>
    </>)
}