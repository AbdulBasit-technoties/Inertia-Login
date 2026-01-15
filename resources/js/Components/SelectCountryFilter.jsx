import React from "react";
import { router } from "@inertiajs/react";

const SelectCountryFilter = ({
    label,
    options = [],
    value = "",
    onChange,
    routeName,
    queryKey = "filter",
    extraParams = {}, // 👈 new prop
}) => {
    return (
        <label className="select border border-custbord bg-white !outline-none focus:outline-none dark:bg-transparent dark:border-darkbord w-full md:w-auto lg:w-[40%] xl:w-auto">
            <span className="label text-primary dark:text-white font-medium !text-[13px]">
                {label}
            </span>
            <select
                className="!ring-custgreen !ring-offset-custgreen !border-custgreen !text-[13px] join-item bg-white !rounded-[0px] !border !border-transparent h-full !outline-none dark:bg-primary text-primary dark:text-white sm:w-[120px] font-medium"
                value={value}
                onChange={(e) => {
                    const val = e.target.value;

                    if (onChange) {
                        onChange(val);
                    }

                    if (routeName) {
                        router.visit(route(routeName), {
                            data: {
                                [queryKey]: val ? [val] : [],
                                ...extraParams, // 👈 merge extra params
                            },
                            preserveState: true,
                            replace: true,
                        });
                    }
                }}
            >
                <option value="">Select {label}</option>
                {options.map((item, index) => (
                    <option
                        className="dark:!bg-primary"
                        key={index}
                        value={item.value}
                    >
                        {item.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SelectCountryFilter;
