export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label
            {...props}
            className={`block font-medium text-[15px] text-primary dark:text-secondary ${className}`}
        >
            {value ? value : children}
        </label>
    );
}