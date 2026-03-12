import React from "react";
import Select from "react-select";

const SelectComponent = ({
    options,
    value,
    onChange,
    className,
    isMulti = false,
    placeholder = "Select...",
    darkBgClass = "dark:!bg-primary",
}) => {

    const customClassNames = {
        control: ({ isFocused }) =>
            `rounded-md p-1 bg-transparent dark:bg-transparent border 
        ${
            isFocused
                ? "!border-custgreen"
                : `!border-transparent ${darkBgClass} !dark:text-secondary`
        }
        !shadow-none focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0 focus:!shadow-none`,

        menu: () =>
            "mt-1 rounded-md bg-white dark:bg-primary dark:text-secondary shadow-lg",

        option: ({ isFocused, isSelected }) => {
            let base =
                "p-2 cursor-pointer transition-colors duration-500 hover:!bg-custgreen !text-black dark:!text-white hover:!text-secondary ";

            if (isSelected) {
                base +=
                    " !bg-custgreen text-white dark:text-white dark:!bg-custgreen";
            } else if (isFocused) {
                base +=
                    " !bg-custgreen !text-secondary dark:bg-gray-700 text-black dark:text-white";
            } else {
                base += " bg-white dark:bg-primary text-black dark:text-secondary";
            }

            return base;
        },

        singleValue: () => "!text-black dark:!text-gray-200",

        placeholder: () => "!text-gray-400 dark:!text-gray-500",

        input: () =>
            "!text-black dark:!text-white focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0",

        dropdownIndicator: ({ isFocused, isSelected }) =>
            isFocused || isSelected
                ? "!text-custgreen"
                : "text-gray-400 dark:text-gray-500",
    };

    const customStyles = {
        input: (provided, state) => ({
            ...provided,
            color: state.isFocused
                ? state.selectProps.isDark
                    ? "#fff"
                    : "#000"
                : state.selectProps.isDark
                ? "#fff"
                : "#000",
            boxShadow: "none",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
        }),
    };

    const getSelectedOptions = () => {
        if (!options || !Array.isArray(options)) return null;

        if (isMulti) {
            if (Array.isArray(value)) {
                return options.filter((option) => value.includes(option.value));
            }
            return [];
        }

        return options.find((option) => option.value === value) || null;
    };

    return (
        <Select
            options={options}
            value={getSelectedOptions()}
            onChange={(selected) => {
                if (isMulti) {
                    const values = selected
                        ? selected.map((option) => option.value)
                        : [];
                    onChange(values);
                } else {
                    onChange(selected ? selected.value : null);
                }
            }}
            isMulti={isMulti}
            placeholder={placeholder}
            className={className}
            classNames={customClassNames}
            styles={{
                ...customStyles,
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
        />
    );
};

export default SelectComponent;
