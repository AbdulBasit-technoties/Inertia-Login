export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 font-medium bg-blue border border-transparent rounded text-[14px] text-white capitalize hover:border-blue hover:bg-transparent hover:text-blue dark:hover:bg-transparent dark:hover:border-blue dark:hover:text-blue transition-all duration-500 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
