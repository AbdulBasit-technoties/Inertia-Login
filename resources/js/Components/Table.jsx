import React, { useRef, useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export const Table = ({ children }) => {
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(
            el.scrollLeft + el.clientWidth < el.scrollWidth - 5
        );
    };

    const scrollByAmount = (amount) => {
        scrollRef.current.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    return (
        <div className="relative">
            {showLeft && (
                <button
                    onClick={() => scrollByAmount(-300)}
                    className="transition-all duration-500 absolute left-[-10px] sm:left-[-15px] top-[22px] -translate-y-1/2 z-[6] bg-custgreen shadow-md rounded-full w-[25px] h-[25px] text-[12px] text-secondary flex items-center justify-center hover:bg-custblack"
                >
                    <MdArrowBackIosNew />
                </button>
            )}
            {showRight && (
                <button
                    onClick={() => scrollByAmount(300)}
                    className="transition-all duration-500 absolute right-[-10px] sm:right-[-15px] top-[22px] -translate-y-1/2 z-[6] bg-custgreen shadow-md rounded-full w-[25px] h-[25px] text-[12px] text-secondary flex items-center justify-center hover:bg-custblack"
                >
                    <MdArrowForwardIos />
                </button>
            )}

            <div
                ref={scrollRef}
                className="rounded overflow-x-auto scrollbar-hide"
            >
                <table className="table table-xs w-full table-main lg:min-w-max min-w-[1600px]">
                    {children}
                </table>
            </div>
        </div>
    );
};

// export const Table = ({ children }) => (
//     <div className="rounded overflow-x-auto">
//         <table className="table table-xs w-full table-main lg:min-w-max min-w-[1600px]">
//             {children}
//         </table>
//     </div>
// );

export const Thead = ({ children }) => (
    <thead className="dark:bg-primary bg-custbg border-b border-[#E8E8E8] dark:border-gray-100/30 text-primary dark:text-secondary">
        <tr className="border-none">{children}</tr>
    </thead>
);

export const Tbody = ({ children }) => (
    <tbody className="bg-white dark:bg-transparent text-custblack">{children}</tbody>
);

export const Tr = ({ children }) => (
    <tr className="space-y-3 font-medium border-y border-[#E8E8E8] dark:border-gray-100/30 dark:text-secondary">
        {children}
    </tr>
);

export const Th = ({ children }) => (
    <th className="py-3 font-medium capitalize px-4 text-custblack dark:text-secondary text-left text-[14px] font-semibold">{children}</th>
);

export const Td = ({ children }) => (
    <td className="text-sm py-3 font-normal px-4">{children}</td>
);