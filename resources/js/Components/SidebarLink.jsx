import { Link } from '@inertiajs/react';

export default function SidebarLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center justify-between p-2 text-gray-900 transition-all duration-500 rounded-lg group ' +
                (active
                    ? ''
                    : '') +
                className
            }
        >
            {children}
        </Link>
    );
}
