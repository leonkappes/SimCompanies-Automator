import { FC } from "react"

type ItemProps = {
    title: string
}

const Item: FC<ItemProps> = function Item({title ,children}) {
    return (
        <div className="lg:w-1/3 lg:px-4 xl:px-6 mt-8 lg:mt-0 mx-3 text-center rounded-md bg-indigo-700 bg-opacity-25">
            <h5 className="text-xl font-medium uppercase mb-2">{title}</h5>
            {children}
        </div>
    )
}

export default Item;