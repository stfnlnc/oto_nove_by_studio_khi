export default function Label({children}) {
    return (<>
        <div className={"label absolute top-1/2 left-1/2 z-200 text-[1.25vw] uppercase px-[0.62vw] bg-white rounded-[0.375vw] border border-black opacity-0 whitespace-nowrap"}>{children}</div>
    </>)
}