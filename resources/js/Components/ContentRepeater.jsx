import React from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import TextInput from "@/Components/TextInput";

const ContentRepeater = ({ items, setItems }) => {
    const handleChange = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, ""]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium">Add List Item</h2>
                <PlusCircleIcon
                    className="size-9 text-custgreen cursor-pointer"
                    onClick={addItem}
                />
            </div>
            <hr className="mb-4" />
            {items.map((item, index) => (
                <div key={index} className="flex items-center mb-3 gap-2">
                    <TextInput
                        type="text"
                        className="border rounded p-2 w-full"
                        placeholder="Enter list item"
                        value={item}
                        onChange={(e) => handleChange(index, e.target.value)}
                    />
                    <TrashIcon
                        className="size-6 text-custgreen cursor-pointer"
                        onClick={() => removeItem(index)}
                    />
                </div>
            ))}
            {items.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">Preview:</h3>
                    <ul className="list-disc list-inside bg-[#f8f8fb] p-4 rounded dark:bg-[#17212e] dark:text-secondary/90">
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ContentRepeater;
