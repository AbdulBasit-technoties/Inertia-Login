import React from "react";
import { Link } from "@inertiajs/react";
import { MdRefresh } from "react-icons/md";

export default function ResetButton({ routeName, label = "Reset", className = "" }) {
    return (
        <Link
            href={route(routeName)}
            className={`inline-flex items-center sm:ml-4 px-4 py-2 font-medium bg-blue border border-transparent rounded text-[14px] text-white capitalize hover:border-blue hover:bg-transparent hover:text-blue dark:hover:bg-transparent dark:hover:border-blue dark:hover:text-blue transition-all duration-500 ${className}`}
        >
            <MdRefresh className="me-2 translate-y-[1px] text-[18px]" />
            {label}
        </Link>
    );
}
