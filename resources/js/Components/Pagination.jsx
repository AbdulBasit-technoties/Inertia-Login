import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ data }) => {
    if (!data || data.last_page <= 1) return null;

    return (
        <div className="join flex justify-center mt-6 w-full gap-[5px]">
            <Link
                href={data.prev_page_url || "#"}
                className={`join-item btn ${data.prev_page_url
                    ? "bg-transparent border-custgreen text-custgreen text-[20px] hover:bg-custgreen hover:text-white"
                    : "btn-disabled hidden"
                    }`}
            >
                <span className="translate-y-[-2px]">«</span>
            </Link>

            <button className="join-item btn cursor-default bg-custgreen text-white border-0">
                Page {data.current_page}
            </button>
            <Link
                href={data.next_page_url || "#"}
                className={`join-item btn ${data.next_page_url
                        ? "bg-transparent border-custgreen text-custgreen text-[20px] hover:bg-custgreen hover:text-white"
                        : "btn-disabled hidden"
                    }`}
            >
                <span className="translate-y-[-2px]">»</span>
            </Link>

        </div>
    );
};

export default Pagination;
