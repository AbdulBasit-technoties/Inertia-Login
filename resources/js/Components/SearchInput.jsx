import React from "react";
import TextInput from "./TextInput";

const SearchInput = ({
    placeholder = "Search...",
    value,
    onChange,
    onSearch,
}) => {
    return (
        <div className="relative w-full sm:w-[230px] md:w-auto">
            <div className="cust-search-filter relative flex items-center rounded overflow-hidden">
                <TextInput
                    type="text"
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="dark:placeholder:text-gray-400 w-full px-2 md:px-4 !text-[14px] !ring-0 border rounded rounded-tr-none rounded-br-none dark:text-white border-custbord dark:!bg-custdarkbg focus:outline-none focus:border-custgreen dark:focus:border-custgreen"
                />
                <button
                    className="p-3 bg-custgreen h-[45px] inline-block"
                    type="button"
                    onClick={onSearch}
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
                        <line
                            x1="21"
                            y1="21"
                            x2="16.65"
                            y2="16.65"
                        ></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SearchInput;
