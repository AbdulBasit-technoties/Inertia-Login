import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

export default function RatingInput({ data, setData, errors }) {
    const [hovered, setHovered] = useState(null);

    const handleClick = (value) => {
        setData("rating", value);
    };

    return (
        <>
            <InputLabel
                htmlFor="rating"
                value="Rating"
            />
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                        key={star}
                        className={`cursor-pointer transition-colors w-10 h-10 duration-200 ${star <= (hovered || data.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                            }`}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => handleClick(star)}
                    />
                ))}
            </div>
            <InputError message={errors.rating} className="mt-2" />
        </>
    );
}
