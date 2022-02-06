import { ActionFunction, Form, json, LoaderFunction, redirect, useLoaderData } from "remix";
import { getSession, commitSession } from "../../session";

export default function Login() {
    const { currentUser, error } = useLoaderData();

    return (
        <div>
            <Form method="post">
                <label htmlFor="id">ID: <input type="text" name="sessionid" /></label>
            </Form>
        </div>
    )
}

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("id"))
        return redirect("/")

    const data = { error: session.get("error") };

    return json(data, {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    });
}

export const action: ActionFunction = async ({ request }) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    let data = await request.formData()

    let id = data.get("sessionid")

    session.set("id", id)

    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
}