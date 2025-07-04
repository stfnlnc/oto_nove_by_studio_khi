export default function Label({ className, children }) {
    return (
        <>
            <div
                className={
                    className +
                    " pointer-events-none fixed top-0 left-0 z-9999 text-[1.25vw] inter leading-loose uppercase px-[0.62vw] py-0 bg-white text-black rounded-[0.375vw] border border-black scale-0 transition-[transform] duration-300 whitespace-nowrap"
                }
            >
                {children}
            </div>
        </>
    );
}
