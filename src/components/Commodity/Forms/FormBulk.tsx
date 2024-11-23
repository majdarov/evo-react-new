import { Modal } from "../../common/Modal/Modal"

interface IProps {
    items: string[]
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onAbort: (e: React.FormEvent<HTMLFormElement>) => void
}

export const FormBulk: React.FC<IProps> = ({ items, onSubmit, onAbort }) => {
    return (
        <Modal>
            <form onSubmit={onSubmit} onReset={onAbort}>
                <ul>
                    {items.map(item => <li>{item}</li>)}
                </ul>
                <input type="submit" value="Submit" />
                <input type="reset" value="Reset" />
            </form>
        </Modal>
    )

}
