import {StrictMode} from "react";
import App from "./App";
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
);
