import React from "react";

export const Table = ({ children }) => (
    <div className="rounded overflow-x-auto">
        <table className="table table-xs w-full table-main border border-[#E8E8E8] dark:border-gray-100/30 lg:min-w-max min-w-[1600px]">
            {children}
        </table>
    </div>
);

export const Thead = ({ children }) => (
    <thead className="dark:bg-transparent bg-[#fafafa] border-t border-b border-[#E8E8E8] dark:border-gray-100/30 text-primary dark:text-secondary">
        <tr className="border-none">{children}</tr>
    </thead>
);

export const Tbody = ({ children }) => (
    <tbody className="bg-white dark:bg-transparent">{children}</tbody>
);

export const Tr = ({ children }) => (
    <tr className="space-y-3 font-medium border-y border-[#E8E8E8] dark:border-gray-100/30 dark:text-secondary/90">
        {children}
    </tr>
);

export const Th = ({ children }) => (
    <th className="py-3 font-medium capitalize">{children}</th>
);

export const Td = ({ children }) => (
    <td className="text-sm py-4 font-normal px-4">{children}</td>
);