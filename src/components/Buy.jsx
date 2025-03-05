export default function Buy({children, href}) {
    return (<>
        <a href="/tickets" className={"group text-[1.8vw] leading-[100%] uppercase flex flex-row gap-2"}>
            <div className="relative overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className={"w-[2vw] group-hover:translate-x-full transition-transform duration-500"} viewBox="0 0 35 36" fill="none">
                    <path d="M18.3203 8.15625L28.1641 18L18.3203 27.8438M26.7969 18H6.83594" stroke="#262626" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="square"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={"w-[2vw] absolute right-full top-0 group-hover:translate-x-full transition-transform duration-500"} viewBox="0 0 35 36" fill="none">
                    <path d="M18.3203 8.15625L28.1641 18L18.3203 27.8438M26.7969 18H6.83594" stroke="#262626" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="square"/>
                </svg>
            </div>
            {children}
        </a>
    </>)
}