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
                'text-primary rounded mt-1 block px-4 py-3 w-full h-[120px] dark:bg-primary dark:text-secondary border border-transparent focus:border-custgreen outline-none ' +
                className
            }
            ref={input}
        ></textarea>
    );
});
