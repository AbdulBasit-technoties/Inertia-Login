import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextareaInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'border-custbord dark:border-darkbord text-primary focus:border-custgreen focus:ring-0 rounded shadow-sm mt-1 block w-full h-[120px] dark:bg-primary dark:focus:border-custgreen dark:text-secondary ' +
                className
            }
            ref={input}
        ></textarea>
    );
});
