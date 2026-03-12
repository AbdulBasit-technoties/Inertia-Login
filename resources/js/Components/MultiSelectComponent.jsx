import React from 'react';
import Select from 'react-select';

const MultiSelectComponent = ({ options, value, onChange, className, darkBgClass = "dark:!bg-primary", }) => {

      const customClassNames = {
        control: ({ isFocused }) =>
          `rounded-md p-1 bg-transparent dark:bg-transparent border 
          ${isFocused ? '!border-custgreen' : `!border-transparent ${darkBgClass} !dark:text-secondary`}
          !shadow-none focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0 focus:!shadow-none`,
      
        menu: () => "mt-1 rounded-md bg-white dark:bg-primary dark:text-secondary shadow-lg",
      
        option: ({ isFocused, isSelected }) => {
          let base = "p-2 cursor-pointer transition-colors duration-500 hover:!bg-custgreen hover:!text-secondary ";
      
          if (isSelected) {
            base += " !bg-custgreen text-white dark:text-white dark:!bg-custgreen";
          } else if (isFocused) {
            base += " !bg-custgreen !text-secondary dark:bg-gray-700 text-black dark:text-white";
          } else {
            base += " bg-white dark:bg-primary text-black dark:text-secondary";
          }
      
          return base;
        },
      
        singleValue: () => "!text-black dark:!text-gray-200",
      
        placeholder: () => "!text-gray-400 dark:!text-gray-500",
      
        input: () => "!text-black dark:!text-white focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0",
      
        dropdownIndicator: ({ isFocused, isSelected }) =>
          (isFocused || isSelected) ? "!text-custgreen" : "text-gray-400 dark:text-gray-500"
      };
      

    const customStyles = {
        input: (provided, state) => ({
            ...provided,
            color: state.isFocused
                ? (state.selectProps.isDark ? '#fff' : '#000')
                : (state.selectProps.isDark ? '#fff' : '#000'),
            boxShadow: 'none',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
        }),
    };


    // Ensure options is an array before calling find
    const selectedOptions = options && Array.isArray(options)
        ? options.filter(option => value && Array.isArray(value) && value.includes(option.value))
        : [];

    return (
        <Select
            isMulti={true}
            options={options}
            value={selectedOptions}
            onChange={(selectedOptions) => {
                const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                onChange(values);
            }}
            classNames={customClassNames}
            classNamePrefix="select"
            styles={{
                ...customStyles,
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
        />
    );
};

export default MultiSelectComponent;