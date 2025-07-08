export default function ContentLink({ children, href }) {
    return (
        <>
            <a
                href={href}
                className={
                    "buy-links text-[1.25rem] leading-[100%] uppercase flex flex-row items-center gap-2"
                }
            >
                <div className="relative overflow-hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={"w-[1.2rem]"}
                        viewBox="0 0 35 36"
                        fill="none"
                    >
                        <path
                            d="M18.3203 8.15625L28.1641 18L18.3203 27.8438M26.7969 18H6.83594"
                            stroke="#262626"
                            strokeWidth="2.5"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                    </svg>
                </div>
                {children}
            </a>
        </>
    );
}
