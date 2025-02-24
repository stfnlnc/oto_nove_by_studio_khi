export default function Loader() {
    return (<>
        <div className={"loader fixed flex flex-row items-center justify-end text-right galgo text-[22vw] leading-[50%] bottom-[1vw] left-[1vw] z-100 text-white transition-all duration-700 pointer-events-none w-[23vw]"}>
            <div className={"transition-opacity duration-700"}>

            </div>
            <div className={"relative transition-opacity duration-700"}>
                0
                <div className={"uppercase absolute left-full top-0 whitespace-nowrap opacity-0 transition-opacity duration-1000 delay-300"}>t0 n0ve fest</div>
            </div>
            <div className={"transition-opacity duration-700"}>
                %
            </div>
        </div>
    </>)
}