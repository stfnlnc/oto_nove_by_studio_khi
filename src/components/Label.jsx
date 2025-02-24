export default function Label({children}) {
    return (<>
        <div className={"label absolute top-0 left-0 text-[1.25vw] uppercase px-[0.62vw] bg-white rounded-[0.375vw] border border-black opacity-0 whitespace-nowrap"}>{children}</div>
    </>)
}