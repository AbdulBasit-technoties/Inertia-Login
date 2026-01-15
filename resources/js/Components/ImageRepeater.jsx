import React, { useState } from "react";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const ImageRepeater = ({ images, setImages }) => {
    const handleFileChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    const addImage = () => {
        setImages([...images, null]);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium">Add Images</h2>
                <PlusCircleIcon
                    className="size-9 text-custgreen cursor-pointer"
                    onClick={addImage}
                />
            </div>
            <hr className="mb-4" />

            {images.map((image, index) => (
                <div key={index} className="flex items-center mb-3 gap-2">
                    {!(typeof image === "string") && (
                        <input
                            type="file"
                            accept="image/*"
                            className="border rounded p-2 w-full"
                            onChange={(e) =>
                                handleFileChange(index, e.target.files[0])
                            }
                        />
                    )}
                    <TrashIcon
                        className="size-6 text-custgreen cursor-pointer"
                        onClick={() => removeImage(index)}
                    />
                </div>
            ))}

            {images.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                    <div className="bg-[#f8f8fb] flex items-center gap-2 p-[20px] flex-wrap">
                        {images.map((img, index) => {
                            let imageUrl = null;

                            if (img instanceof File) {
                                imageUrl = URL.createObjectURL(img);
                            } else if (typeof img === "string") {
                                imageUrl = img; // ✅ Fixed here
                            }

                            if (!imageUrl) return null;

                            return (
                                <div key={index} className="relative w-20 h-20">
                                    <img
                                        src={imageUrl}
                                        alt={`image-${index}`}
                                        className="object-cover w-full h-full rounded"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageRepeater;
