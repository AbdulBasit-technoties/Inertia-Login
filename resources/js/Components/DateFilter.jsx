import React from "react";

export default function DateFilter({
    fromDate,
    toDate,
    quickRange,
    onFromChange,
    onToChange,
    onQuickRangeChange,
}) {
    return (
        <div className="w-full md:w-auto lg:w-[58%] xl:w-auto">
            <div className="input-main flex-wrap sm:flex-nowrap sm:h-[40px] join border border-gray-500/20 dark:border-gray-100/30 rounded shadow-md w-full md:w-auto">
                {/* From Date */}
                <label className="input bg-white dark:bg-transparent border-0 h-full !outline-none gap-0 pe-0">
                    <span className="label text-primary dark:text-white font-medium !text-[13px]">
                        From
                    </span>
                    <input
                        type="date"
                        className="text-[14px] dark:text-white !ring-0 px-0 w-[100px] inline-flex h-full appearance-none bg-transparent border-none mx-[10px]"
                        value={fromDate}
                        onChange={(e) => onFromChange(e.target.value)}
                    />
                </label>

                {/* To Date */}
                <label className="input bg-white dark:bg-transparent border-0 h-full !outline-none gap-0 pe-0">
                    <span className="label text-primary dark:text-white font-medium !text-[13px]">
                        To
                    </span>
                    <input
                        type="date"
                        className="text-[14px] dark:text-white !ring-0 px-0 w-[100px] inline-flex h-full appearance-none bg-transparent border-none mx-[10px]"
                        value={toDate}
                        onChange={(e) => onToChange(e.target.value)}
                    />
                </label>

                {/* Quick Range */}
                <select
                    className="select !text-[13px] join-item bg-white !rounded-[0px] !border !border-transparent focus:!border-custgreen h-full !outline-none dark:bg-transparent text-primary dark:text-white sm:w-[120px] font-medium"
                    value={quickRange}
                    onChange={(e) => onQuickRangeChange(e.target.value)}
                >
                    <option className="dark:bg-primary" value="">
                        Select
                    </option>
                    <option className="dark:bg-primary" value="today">
                        Today
                    </option>
                    <option className="dark:bg-primary" value="yesterday">
                        Yesterday
                    </option>
                    <option className="dark:bg-primary" value="this_week">
                        This Week
                    </option>
                    <option className="dark:bg-primary" value="this_month">
                        This Month
                    </option>
                </select>
            </div>
        </div>
    );
}
