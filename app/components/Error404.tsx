import { FC } from "react";
import { Link } from "remix";

type Error404Props = {
    link: string,
    text: string,
}

const Error404: FC<Error404Props> = function Error404({ link, text }) {
    return (
        <div className="bg-indigo-100 py-16 lg:py-24 h-full">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-medium mb-2">{text}</h1>
                    <Link to={link} className="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl mt-12 inline-block">Get me Back!</Link>
                </div>
            </div>
        </div>
    )
}

export default Error404;