import Buy from "./Buy.jsx";

export default function Content({date, content, children, artists, color}) {
    return (<>
        <div className={"grid grid-cols-17 w-screen h-[100lvh] absolute top-0 left-full z-50 bg-white"}>
            <div className="content col-span-12 p-5 overflow-y-scroll">
                <div className={"sticky top-0"}>
                    {date && <div className="flex flex-row items-start justify-between border-b border-black pt-5">
                        {date.split(" ").map(textDate => <div key={textDate} className={"galgo text-[22vw] leading-[65%]"}>{textDate}</div>)}
                    </div>}
                    <div className={"flex flex-row items-start justify-start gap-[5vw] py-5"}>
                        <div className={"flex flex-col gap-0 shrink-0"}>
                            <Buy href={""}>Buy tickets</Buy>
                            <Buy href={""}>Buy pass</Buy>
                        </div>
                        <div className={"flex flex-col text-[1.8vw] uppercase w-full leading-[100%]"}>
                            {content && content.split(" / ").map((textContent, key) => <div key={key} className={"border-b border-black w-full pb-2 mb-2"}>{textContent}</div>)}
                            <div className={"normal-case text-[1.6vw] leading-[120%] py-5"}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    {artists && artists[0].friday.artists.map((artist) => (
                        <div className={"h-[100lvh]"} key={artist.id}>
                            <div className={"relative w-96 h-72"}>
                                <img className={"w-full h-full object-cover object-center"} src={artist.image} alt=""/>
                                <div style={{backgroundColor: color[1]}} className={"absolute top-0 left-0 w-full h-full mix-blend-color"}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}