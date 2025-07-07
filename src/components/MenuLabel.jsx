export default function Label({ className, children }) {
    return (
        <>
            <div
                className={
                    className +
                    " w-fit text-[1.25rem] inter leading-none uppercase px-[0.62rem] py-[0.36rem] bg-white text-black rounded-[0.375rem] border border-black whitespace-nowrap"
                }
            >
                {children}
            </div>
        </>
    );
}
