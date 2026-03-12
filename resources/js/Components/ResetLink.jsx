import { Link } from "@inertiajs/react";
import { MdRefresh } from "react-icons/md";

export default function ResetLink({ routeName = "leads.index", label = "Reset" }) {
    return (
        <Link
            href={route(routeName)}
            className="inline-flex items-center px-4 h-[45px] font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
        >
            <MdRefresh className="me-2 translate-y-[1px] text-[18px]" />
            {label}
        </Link>
    );
}
