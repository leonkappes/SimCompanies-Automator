import {
  LinksFunction,
  ErrorBoundaryComponent,
  useCatch,
  Outlet
} from "remix";
import styles from "./styles/app.css"
import Defaut from "./components/Default";
import Error404 from "./components/Error404";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export default function App() {
  return (
    <Defaut>
      <Outlet />
    </Defaut>
  );
}

export const CatchBoundary = function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    case 404:
      return (
        <Defaut title="Page not found">
          <Error404 link="/" text="You're going nowhere, kid!"/>
        </Defaut>
      );
    default:
      return <Defaut title="ERR">Unexpected Error, oh no!</Defaut>;
  }
};

export const ErrorBoundary: ErrorBoundaryComponent = function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};
