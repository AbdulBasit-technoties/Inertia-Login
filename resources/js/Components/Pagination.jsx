import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ meta }) {
    if (!meta || meta.last_page <= 1) return null;

    return (
        <div className="join flex justify-center mt-6 w-full">
            <Link
                href={meta.prev_page_url || "#"}
                className={`join-item btn px-3 py-1 rounded bg-blue text-white ${
                    meta.prev_page_url
                        ? ""
                        : "btn-disabled opacity-50 cursor-not-allowed"
                }`}
            >
                «
            </Link>

            <button className="join-item btn cursor-default px-3 py-1 rounded bg-blue text-secondary mx-1 text-sm">
                Page {meta.current_page}
            </button>

            <Link
                href={meta.next_page_url || "#"}
                className={`join-item btn px-3 py-1 rounded bg-blue text-secondary ${
                    meta.next_page_url
                        ? ""
                        : "btn-disabled opacity-50 cursor-not-allowed"
                }`}
            >
                »
            </Link>
        </div>
    );
}
