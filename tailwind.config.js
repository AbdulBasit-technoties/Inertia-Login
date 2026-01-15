import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#1f2937",
                secondary: "#ffffff",
                custblack: "#000000",
                custgray: "#6F6F6F",
                custbg: "#F6F6F6",
                custbord: "#dee2e6",
                custgreen: "#15ABA2",
                darkbord : "#f3f4f64d",
            },
        },
    },

    plugins: [
        require("flowbite/plugin"), // Flowbite
        require("@tailwindcss/forms"), // Tailwind Forms
        require("daisyui"), // DaisyUI Add Kiya
    ],
};
