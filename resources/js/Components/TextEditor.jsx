import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ id, value, onChange, className }) {
    // Toolbar options
    const modules = {
        toolbar: [
            // Headers
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            // Text styles
            ["bold", "italic", "underline", "strike", "blockquote"],

            // Lists
            [{ list: "ordered" }, { list: "bullet" }],

            // Indent / Align
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],

            // Colors
            [{ color: [] }, { background: [] }],

            // Links, images, videos
            // ["link", "image", "video"],
            ["link"],

            ["clean"],
        ],
    };

    return (
        <div className={`text-primary dark:text-white ${className}`}>
            <ReactQuill
                id={id}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
            />
        </div>
    );
}
