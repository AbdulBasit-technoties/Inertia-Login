import React from "react";
import TextInput from "./TextInput";
import SelectComponent from "./SelectComponent";
import { DateRange, Pagination } from "./Selection";

const DateRangeFilter = ({
    fromDate,
    toDate,
    quickRange,
    setFromDate,
    setToDate,
    handleQuickRange,
    handlePagination,
    pagination,
    dayColumns,
}) => {
    return (
        <>
            <div className="lg:col-span-3 sm:col-span-6 col-span-12 flex items-center gap-[10px] sm:block">
                <span className="block text-[13px] sm:text-[14px] mb-[5px] font-medium text-custblack dark:text-secondary w-[40px] sm:w-auto">
                    From
                </span>
                <label className="input shadow-none bg-white dark:bg-custdarkbg border-0 h-[46px] !outline-none gap-0 pe-0 w-full">
                    <TextInput
                        type="date"
                        className="text-[14px] dark:!bg-custdarkbg w-full"
                        value={fromDate ?? ""}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </label>
            </div>
            <div className="lg:col-span-3 sm:col-span-6 col-span-12 flex items-center gap-[10px] sm:block">
                <span className="block text-[13px] sm:text-[14px] mb-[5px] font-medium text-custblack dark:text-secondary w-[40px] sm:w-auto">
                    To
                </span>
                <label className="input shadow-none bg-white dark:bg-custdarkbg border-0 h-[46px] !outline-none gap-0 pe-0 w-full">
                    <TextInput
                        type="date"
                        className="text-[14px] dark:!bg-custdarkbg w-full"
                        value={toDate ?? ""}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </label>
            </div>
            <div className={`lg:col-span-3 sm:col-span-12 ${dayColumns} col-span-12`}>
                <div className="grid grid-cols-12 gap-[10px]">
                    <div className="sm:col-span-6 col-span-12">
                        <span className="block text-[13px] sm:text-[14px] mb-[5px] font-medium text-custblack dark:text-secondary">
                            Day
                        </span>
                        <SelectComponent
                            className="block w-full"
                            darkBgClass="dark:!bg-custdarkbg"
                            value={quickRange}
                            onChange={(e) => handleQuickRange(e)}
                            options={DateRange}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <span className="block text-[13px] sm:text-[14px] mb-[5px] font-medium text-custblack dark:text-secondary">
                            Pagination
                        </span>
                        <SelectComponent
                            className="block w-full"
                            darkBgClass="dark:!bg-custdarkbg"
                            value={pagination}
                            onChange={(e) => handlePagination(e)}
                            options={Pagination}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DateRangeFilter;
