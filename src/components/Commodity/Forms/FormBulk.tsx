import { useState } from "react"
import { useAppSelector } from "../../../redux/hooks"
import { Modal } from "../../common/Modal/Modal"
// import Tree from "../../common/Tree"
import GroupsTree from "../../common/GroupsTree"

interface IProps {
    items: any[]
    onSubmit: Function
    onAbort: (e: React.FormEvent<HTMLFormElement>) => void
}

export const FormBulk: React.FC<IProps> = ({ items, onSubmit, onAbort }) => {

    const groups = useAppSelector(state => state.commodity.groups)

    const [selectedGroup, setSelectedGroup] = useState<string>('undefined')
    const [showTree, setShowTree] = useState(false)

    function getGroupName(id: string) {
        return groups.find(group => group.id === id)?.label || 'No Group'
    }

    const testTagName = (tagName: string) => tagName === 'SPAN';

    return (
        <Modal>
            <form onSubmit={() => onSubmit(selectedGroup)} onReset={onAbort}>
                <div>
                    <span>Selected group: {getGroupName(selectedGroup) || 'undefined'}</span>
                </div>
                <ul>
                    {items.map(item => <li key={item.id}>{item.name} group:{getGroupName(item.parent_id)}</li>)}
                </ul>
                <input type="submit" value="Submit" />
                <input type="reset" value="Reset" />
                <GroupsTree
                    groups={groups}
                    callbackTree={(id: string, tagName: string, className: string) => {
                        if (!testTagName(tagName)) return;
                        setSelectedGroup(id)
                        setShowTree(false)
                    }}
                    label=""
                    viewEdit={false}
                    isEmpty={false}
                    onClick={() => setShowTree(!showTree)}
                    treeView={showTree}
                    parent_id="0"
                />
            </form>
        </Modal>
    )

}
