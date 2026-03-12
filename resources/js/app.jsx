import "./bootstrap";
import "../css/app.css";
import '@fontsource/inter/400.css'; 
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Helmet } from "react-helmet";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
});

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
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Helmet>
                        <link rel="icon" type="image/png" href={favicon} />
                    </Helmet>
                    <App {...props} />
                </ThemeProvider>
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
