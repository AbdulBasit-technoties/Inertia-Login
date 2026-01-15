import React from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import SelectComponent from "@/Components/SelectComponent"; // Adjust path
import TextInput from "@/Components/TextInput"; // Adjust path

const ItemRepeater = ({ items, setItems, services }) => {
    const handleChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { idn: Date.now(), id: "", price: "" }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            return total + price;
        }, 0);
    };

    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2">
                <h2 className="md:text-xl font-medium dark:text-white text-[16px]">Add Item</h2>
                <PlusCircleIcon
                    className="size-9 text-custgreen cursor-pointer"
                    onClick={addItem}
                />
            </div>
            <hr className="mb-4" />
            {items.map((item, index) => (
                <div key={item.idn} className="flex items-center mb-4 gap-2">
                    <div className="w-2/3">
                        <SelectComponent
                            options={services}
                            value={item.id}
                            onChange={(value) =>
                                handleChange(index, "id", value)
                            }
                        />
                    </div>
                    <TextInput
                        type="number"
                        className="border rounded p-2 w-1/4 h-[46px]"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) =>
                            handleChange(index, "price", e.target.value)
                        }
                    />
                    <TrashIcon
                        className="size-6 text-custgreen cursor-pointer"
                        onClick={() => removeItem(index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ItemRepeater;
