import { renderToPipeableStream } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router";

/**
 * @param {string} _url
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(_url, options) {
    return renderToPipeableStream(
        <StaticRouter location={_url.startsWith("/") ? _url : `/${_url}`}>
            <App />
        </StaticRouter>,
        options
    );
}
