import { HiChevronDown } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";

export default function FilterCategory({
    label,
    categoryKey,
    expanded,
    toggleCategory,
    items,
    selectedItems,
    handleCheckboxChange,
    searchTerm,
    setSearchTerm,
    filterFn = null, // agar extra filter apply karna ho jaise Converted remove
}) {
    const filteredItems = (filterFn ? filterFn(items) : items).filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <fieldset>
            <legend>
                <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => {
                        toggleCategory(categoryKey);
                        setSearchTerm("");
                    }}
                    className="filter-controller flex gap-3 my-1 text-sm font-bold items-center"
                >
                    <HiChevronDown
                        className={`transition-transform ${
                            expanded ? "rotate-180" : "rotate-90"
                        }`}
                        size={20}
                    />
                    {label}
                </button>
            </legend>

            {expanded && (
                <div className="filter-category overflow-y-auto h-48 flex flex-col bg-[#f8f8fb] dark:bg-primary py-4 ps-5 rounded-lg">
                    {/* search box */}
                    <div className="filer-search mb-3 pr-5">
                        <div className="filter-search-item relative">
                            <span className=" absolute top-0 bottom-0 left-0 flex items-center justify-center text-[#868787] pointer-events-none text-[14px] px-3">
                                <IoSearchOutline className="font-bold text-black dark:!text-secondary" />
                            </span>
                            <input
                                className="leading-[1.5] pl-[32px] dark:placeholder:text-[#868787] dark:shadow-none shadow-[0px_4px_4px_rgba(219,219,219,0.25)] focus-visible:!outline-0 rounded-[0.375rem] py-[0.5rem] px-[0.77rem] placeholder:text-xs transition-all duration-500 w-full !text-sm !ring-0 border dark:text-white dark:bg-transparent dark:border-darkbord focus:outline-none focus:border-custgreen dark:focus:border-custgreen"
                                type="search"
                                placeholder="Search Filter"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* items list */}
                    {filteredItems.map((item, index) => (
                        <label
                            key={index}
                            className="text-sm font-medium text-primary mb-2 dark:text-white"
                        >
                            <input
                                type="checkbox"
                                className="mr-2 translate-y-[-2px] text-custgreen focus:ring-custgreen dark:bg-transparent outline-0 dark:ring-0 dark:ring-offset-0"
                                value={item.value}
                                checked={selectedItems.includes(item.value)}
                                onChange={() =>
                                    handleCheckboxChange(item.value, categoryKey)
                                }
                            />
                            {item.label}
                        </label>
                    ))}
                </div>
            )}
        </fieldset>
    );
}
