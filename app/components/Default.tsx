import { FC } from "react";
import {
    LiveReload,
    Meta,
    Scripts,
    Links,
    ScrollRestoration
  } from "remix";
import Header from "./layout/Header";

const Defaut: FC<{ title?: string }> = function Default({ title, children}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <title>{title ? `${title} | SimCompanies Automator` : "SimCompanies Automator"}</title>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                <div className="h-screen">{children}</div>
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === "development" && <LiveReload />}
            </body>
        </html>
    )
}

export default Defaut;