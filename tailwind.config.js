import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
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
                custbg: "#f6f6f6",
                custbord: "#dee2e6",
                custgreen: "#1785a0",
                custdarkbg: "#17212e",
                darkbord : "#f3f4f64d",
            },
        },
    },

    plugins: [],
};
