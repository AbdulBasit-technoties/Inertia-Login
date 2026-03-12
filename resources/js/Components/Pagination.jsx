import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ data, pageParam = "page" }) => {
    if (!data || !data.links || data.total <= data.per_page) return null;

    const getPageFromUrlOrLabel = (url, label) => {
        if (!url && !label) return null;

        try {
            const parsed = new URL(url, window.location.origin);
            const pageFromDefault = parsed.searchParams.get("page");
            if (pageFromDefault) return pageFromDefault;

            const pageFromCustom = parsed.searchParams.get(pageParam);
            if (pageFromCustom) return pageFromCustom;
        } catch (e) {
        }

        if (url) {
            const regex = /[?&](?:page|''' + pageParam + '''|[A-Za-z0-9_%-]+)=([0-9]+)/i;
        }

        if (url) {
            const m1 = url.match(/[?&]page=([0-9]+)/i);
            if (m1 && m1[1]) return m1[1];

            const m2 = url.match(new RegExp("[?&]" + pageParam + "=([0-9]+)", "i"));
            if (m2 && m2[1]) return m2[1];

            const mAny = url.match(/[?&]([a-z0-9_%-]+)=([0-9]+)/i);
            if (mAny && mAny[2]) return mAny[2];
        }

        if (label) {
            const tmp = label.replace(/<[^>]*>/g, "").trim();
            const num = parseInt(tmp, 10);
            if (!Number.isNaN(num)) return String(num);
        }

        return null;
    };

    const replacePageParam = (url, label) => {
        if (!url) return null;

        const pageValue = getPageFromUrlOrLabel(url, label);

        try {
            const parsed = new URL(url, window.location.origin);

            parsed.searchParams.delete("page");
            parsed.searchParams.delete(pageParam);

            if (pageValue && !Number.isNaN(parseInt(pageValue, 10))) {
                parsed.searchParams.set(pageParam, pageValue);
            }

            return parsed.pathname + parsed.search + parsed.hash;
        } catch (e) {
            let newUrl = url.replace(/[?&]page=[0-9]+/gi, "");
            newUrl = newUrl.replace(new RegExp("[?&]" + pageParam + "=[0-9]+", "gi"), "");

            if (pageValue && !Number.isNaN(parseInt(pageValue, 10))) {
                const sep = newUrl.includes("?") ? "&" : "?";
                newUrl = newUrl + sep + encodeURIComponent(pageParam) + "=" + encodeURIComponent(pageValue);
            }

            return newUrl;
        }
    };

    return (
        <div className="flex flex-col items-center md:items-end">
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end mt-4 space-x-1">
                {data.links.map((link, index) => {
                    const isDisabled = link.url === null;

                    return (
                        <Link
                            key={index}
                            href={link.url ? replacePageParam(link.url, link.label) : "#"}
                            className={`px-3 py-1 mt-1 border rounded-md text-sm transition-all duration-500
                                ${link.active
                                    ? "bg-custgreen dark:border-transparent text-white"
                                    : isDisabled
                                        ? "bg-custbg dark:bg-primary dark:border-transparent dark:text-secondary cursor-not-allowed"
                                        : "bg-custbg dark:bg-primary dark:border-transparent dark:text-secondary hover:!bg-custgreen hover:!text-secondary"
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={(e) => { if (isDisabled) e.preventDefault(); }}
                            preserveScroll
                            preserveState
                        />
                    );
                })}
            </div>

            <div className="text-sm mt-2">
                <span className="inline-block font-semibold text-custblack dark:text-secondary md:text-sm text-xs">{data.total > 0
                    ? `Per page ${data.from} – ${data.to} / ${data.total}`
                    : "No records available"}</span>
            </div>
        </div>
    );
};

export default Pagination;
