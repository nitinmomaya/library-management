export interface Book {
    id?: string | undefined,
    bookname?: string | undefined,
    authorname?: string | undefined,
    status?: string | undefined
}

export interface BookActionsInterface {
    type: string,
    label: string,
    function: () => void
    disabled?: boolean
}

export interface BookDataInterface extends Book {
    actions? : BookActionsInterface[]
}