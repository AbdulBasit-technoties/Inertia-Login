import "./bootstrap";
import "../css/app.css";
import "flowbite";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Helmet } from "react-helmet";

createInertiaApp({
    title: (title) => {
        return title ? `${title} - Technoties-Crm` : "Technoties-Crm";
    },
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const favicon = "/image/fav-icon.png";
        root.render(
            <>
                <Helmet>
                    <link rel="icon" type="image/png" href={favicon} />
                </Helmet>
                <App {...props} />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
