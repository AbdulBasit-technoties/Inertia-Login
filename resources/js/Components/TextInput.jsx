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
                'border-custbord dark:border-darkbord text-primary focus:border-primary focus:ring-0 rounded shadow-sm dark:bg-primary dark:focus:border-custgreen dark:text-secondary ' +
                className
            }
            ref={input}
        />
    );
});
