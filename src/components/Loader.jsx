export default function Loader() {
    return (
        <>
            <div
                className={
                    "loader-container fixed flex flex-col lg:flex-row items-start lg:items-center justify-start gap-[3vw] bottom-4 lg:bottom-[1vw] left-4 lg:left-[1vw] z-100 pointer-events-none"
                }
            >
                <div
                    data-content="Contemporary"
                    className={"label-container relative"}
                >
                    <img
                        className="loader h-[30vw] lg:h-[18vw] pointer-events-auto"
                        src="oto.svg"
                        alt=""
                        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    />
                </div>
                <div
                    data-content="Music & Sound"
                    className={"label-container relative"}
                >
                    <img
                        className="loader h-[30vw] lg:h-[18vw] pointer-events-auto"
                        src="nove.svg"
                        alt=""
                        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    />
                </div>
                <div
                    data-content="January 25 to 27, 2025"
                    className={"label-container relative"}
                >
                    <img
                        className="loader h-[30vw] lg:h-[18vw] pointer-events-auto"
                        src="fest.svg"
                        alt=""
                        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    />
                </div>
            </div>
        </>
    );
}
