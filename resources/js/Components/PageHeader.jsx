import React from "react";

export default function PageHeader({ title, total, perPage, buttonLabel, onButtonClick }) {
    return (
        <div className="flex font-semibold items-center leading-tight focus:ring-black text-primary text-xl justify-between mb-4">
            <h2 className="text-primary text-[22px] font-semibold capitalize">
                {title}
            </h2>
            <div className="text-primary md:text-sm text-xs">
                Per page {total}/{perPage}
                <label
                    onClick={onButtonClick}
                    className="inline-flex items-center ml-4 px-4 py-2 font-medium bg-blue border border-transparent rounded text-[14px] text-white capitalize hover:border-blue hover:bg-transparent hover:text-blue dark:hover:bg-transparent dark:hover:border-blue dark:hover:text-blue transition-all duration-500"
                >
                    {buttonLabel}
                </label>
            </div>
        </div>
    );
}
