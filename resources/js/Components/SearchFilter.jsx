import React from "react";

export default function SearchFilter({
    value,
    onChange,
    onSearch,
    placeholder = "Search...",
}) {
    return (
        <div className="relative w-full sm:w-auto">
            <div className="cust-search-filter relative flex items-center rounded overflow-hidden shadow-md">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-2 md:px-4 h-[40px] !text-[14px] sm:!text-[12px] md:!text-[14px] !ring-0 border dark:text-white border-blue dark:bg-transparent dark:border-darkbord focus:outline-none focus:border-blue dark:focus:border-blue"
                />
                <button
                    type="button"
                    onClick={onSearch}
                    className="p-3 bg-blue h-[40px] inline-block"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
}
