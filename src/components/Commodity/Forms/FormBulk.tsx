import { useState } from "react"
import { useAppSelector } from "../../../redux/hooks"
import { Modal } from "../../common/Modal/Modal"
import GroupsTree from "../../common/GroupsTree"
import s from './Form.module.css';
import { Button } from "../../common/Button/Button";

interface IProps {
    items: any[]
    onSubmit: Function
    onAbort: Function// (e: React.FormEvent<HTMLFormElement>) => void
}

export const FormBulk: React.FC<IProps> = ({ items, onSubmit, onAbort }) => {

    const groups = useAppSelector(state => state.commodity.groups)

    const [selectedGroup, setSelectedGroup] = useState<string>('undefined')
    const [showTree, setShowTree] = useState(false)

    function getGroupName(id: string) {
        return groups.find(group => group.id === id)?.label || 'No Group'
    }

    const testTagNameIsSpan = (tagName: string | undefined) => tagName === 'SPAN';

    return (
        <Modal>
            <form id={s['form-bulk']} /* onSubmit={() => onSubmit(selectedGroup)} onReset={onAbort} */>
                <fieldset className={s['product-info']}>
                    <legend>Select new group</legend>
                    <div className={s.propertyes}>
                        <ul>
                            {items.map(item => <li key={item.id}>
                                {item.name}
                                <strong style={{ color: 'red' }}>{getGroupName(item.parent_id)}</strong>
                            </li>)}
                        </ul>
                    </div>
                    <GroupsTree
                        groups={groups}
                        callbackTree={
                            (id: string, tagName?: string, className?: string) => {
                                if (!testTagNameIsSpan(tagName)) return;
                                setSelectedGroup(id)
                                setShowTree(false)
                            }
                        }
                        label={getGroupName(selectedGroup)}
                        viewEdit={false}
                        isEmpty={false}
                        onClick={() => setShowTree(!showTree)}
                        treeView={showTree}
                        parent_id="0"
                    />
                </fieldset>
                <div className={s['buttons']}>
                    <Button
                        label="Change group"
                        type="submit"
                        icon="fa fa-save"
                        callback={() => onSubmit(selectedGroup)}
                    />
                    <Button
                        label="Reset"
                        type="reset"
                        icon="fa fa-undo"
                        callback={onAbort}
                    />
                </div>
                {/* <input type="submit" value="Submit" /> */}
                {/* <input type="reset" value="Reset" /> */}

            </form>
        </Modal>
    )

}
