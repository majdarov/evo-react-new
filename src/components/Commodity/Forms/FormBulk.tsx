import { useState } from "react"
import { useAppSelector } from "../../../redux/hooks"
import { Modal } from "../../common/Modal/Modal"
import Tree from "../../common/Tree"

interface IProps {
    items: any[]
    onSubmit: Function
    onAbort: (e: React.FormEvent<HTMLFormElement>) => void
}

export const FormBulk: React.FC<IProps> = ({ items, onSubmit, onAbort }) => {

    const groups = useAppSelector(state => state.commodity.groups)

    const [selectedGroup, setSelectedGroup] = useState<string>('undefined')

    function getGroupName(id: string) {
        return groups.find(group => group.id === id)?.label || 'No Group'
    }

    return (
        <Modal>
            <form onSubmit={() => onSubmit(selectedGroup)} onReset={onAbort}>
                <div>
                    <Tree
                        rootLabel="/"
                        data={groups}
                        pId=""
                        treeLabel="Groups"
                        callback={(id: string) => setSelectedGroup(id)}
                        viewEdit={true}
                    />
                </div>
                <div>
                    <span>Selected group: {getGroupName(selectedGroup) || 'undefined'}</span>
                </div>
                <ul>
                    {items.map(item => <li key={item.id}>{item.name} group:{getGroupName(item.parent_id)}</li>)}
                </ul>
                <input type="submit" value="Submit" />
                <input type="reset" value="Reset" />
            </form>
        </Modal>
    )

}
