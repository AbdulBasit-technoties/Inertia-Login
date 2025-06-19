import React from "react";

export function Table({ children }) {
    return (
        <div className="rounded overflow-x-auto">
            <table className="table table-xs w-full table-main border border-[#E8E8E8] dark:border-gray-100/30 min-w-[1300px]">
                {children}
            </table>
        </div>
    );
}

export function Thead({ children }) {
    return (
        <thead className="dark:bg-transparent bg-[#fafafa] border-t border-b border-[#E8E8E8] dark:border-gray-100/30 text-primary dark:text-secondary">
            {children}
        </thead>
    );
}

export function Tbody({ children }) {
    return (
        <tbody className="bg-white dark:bg-transparent">
            {children}
        </tbody>
    );
}

export function Tr({ children }) {
    return (
        <tr className="border-y border-[#E8E8E8] dark:border-gray-100/30 dark:text-secondary/60">
            {children}
        </tr>
    );
}

export function Th({ children }) {
    return (
        <th className="py-3 font-medium text-start ps-3">
            {children}
        </th>
    );
}

export function Td({ children }) {
    return (
        <td className="text-sm py-4 font-normal ps-3">
            {children}
        </td>
    );
}
