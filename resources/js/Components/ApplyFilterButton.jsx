export default function ApplyFilterButton({ onClick, label = "Apply Filter" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="mt-4 inline-flex items-center px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
        >
            {label}
        </button>
    );
}
