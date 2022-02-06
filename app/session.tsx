import { createCookieSessionStorage, redirect } from "remix";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: "__SESSION"
    }
})

type TokenRequest = {
    request: Request
}

export async function currentToken({request}: TokenRequest) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    return session.get("id");
}

export { getSession, commitSession, destroySession }