import { IoFilter } from "react-icons/io5";

export default function FilterButton({ onClick, children = "Filter" }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="inline-flex items-center sm:ml-4 px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
        >
            <IoFilter className="me-2 text-[16px]" />
            {children}
        </button>
    );
}
