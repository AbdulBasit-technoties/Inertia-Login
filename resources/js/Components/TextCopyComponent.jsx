import React, { useState } from "react";

export default function TextCopyComponent({ children, text }) {
    const [copied, setCopied] = useState(false);

    const handleDoubleClick = async () => {
        if (!text) return;

        try {
            let textToCopy = "";

            // agar HTML mila hai to plain text extract karo
            if (/<[a-z][\s\S]*>/i.test(text)) {
                const temp = document.createElement("div");
                temp.innerHTML = text;
                textToCopy = temp.innerText;
            } else {
                textToCopy = text;
            }

            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <div
            onDoubleClick={handleDoubleClick}
            className="relative cursor-pointer inline-block"
        >
            {children}

            {copied && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-custgreen text-white text-xs px-2 py-0.5 rounded shadow animate-fadeInOut">
                    Copied!
                </span>
            )}
        </div>
    );
}
