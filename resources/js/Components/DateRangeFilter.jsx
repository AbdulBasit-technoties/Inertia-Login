import React from "react";

const DateRangeFilter = ({
    fromDate,
    toDate,
    quickRange,
    setFromDate,
    setToDate,
    handleQuickRange,
    handlePagination,
    pagination
}) => {
    return (
        <div className="w-full md:w-auto lg:w-[58%] xl:w-auto">
            <div className="input-main flex-wrap sm:flex-nowrap sm:h-[40px] join border border-custbord dark:border-darkbord rounded w-full md:w-auto">
                {/* From Date */}
                <label className="input bg-white dark:bg-transparent border-0 h-full !outline-none gap-0 pe-0">
                    <span className="label text-primary dark:text-white font-medium !text-[13px]">
                        From
                    </span>
                    <input
                        type="date"
                        className="text-[14px] dark:text-white !ring-0 px-0 w-[100px]"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </label>

                {/* To Date */}
                <label className="input bg-white dark:bg-transparent border-0 h-full !outline-none gap-0 pe-0">
                    <span className="label text-primary dark:text-white font-medium !text-[13px]">
                        To
                    </span>
                    <input
                        type="date"
                        className="text-[14px] dark:text-white !ring-0 px-0 w-[100px]"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </label>

                {/* Quick Range */}
                <select
                    className="select !text-[13px] join-item bg-white !rounded-[0px] !border !border-transparent focus:!border-custgreen h-full !outline-none dark:bg-primary text-primary dark:text-white sm:w-[120px] font-medium"
                    value={quickRange}
                    onChange={(e) => handleQuickRange(e.target.value)}
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

                <div className="border-l border-custbord dark:border-darkbord">
                    <select
                        value={pagination}
                        onChange={(e) => handlePagination(e.target.value)}
                        className="w-full md:w-[70px] h-full px-2 !ring-0 py-1 text-[13px] border-none outline-none bg-none cursor-pointer dark:bg-primary dark:text-white"
                    >
                        <option value="10" className="text-[13px]">
                            10
                        </option>
                        <option value="30" className="text-[13px]">
                            30
                        </option>
                        <option value="50" className="text-[13px]">
                            50
                        </option>
                        <option value="100" className="text-[13px]">
                            100
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DateRangeFilter;
