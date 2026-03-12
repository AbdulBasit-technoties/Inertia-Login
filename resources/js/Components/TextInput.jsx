import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = type, className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'h-[45px] px-4 text-primary rounded dark:bg-primary dark:text-secondary border border-transparent focus:border-custgreen outline-none ' +
                className
            }
            ref={input}
        />
    );
});
