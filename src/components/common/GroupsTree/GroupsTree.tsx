import { apiIDB } from '../../../api/apiIDB';
import { Modal } from '../Modal/Modal';
import Tree from '../Tree/Tree';
import s from './GroupsTree.module.css';
import { tGroup } from '../../../types';

interface IProps {
    groups: tGroup[];
    treeView: boolean;
    onClick: Function;
    callbackTree: Function;
    parent_id: string;
    isEmpty: boolean;
    deleteProduct: (id: string, type: string) => void;
    getProductId: (id: string, isGroup: boolean) => void;
    label: string;
    countP: number;
    viewEdit: boolean;
    disabled?: boolean;
}


const GroupsTree = (props: IProps) => {

    const { groups, treeView, onClick, callbackTree, parent_id, isEmpty, deleteProduct, getProductId, label, countP, viewEdit } = props;

    let g = groups.find((item: tGroup) => item.id === parent_id);
    let gLabel = `${g ? g.label : 'Root'}( ${countP} )`;
    let onDivClick = props.disabled ? () => { } : onClick;

    async function delGroup() {
        let confirmDel = window.confirm(`Вы действительно хотите удалить группу\n\r${gLabel}\n\rid: ${parent_id}?`)
        if (confirmDel) {
            let parentGroup = (await apiIDB.getGroup(parent_id)).parent_id;
            if (!parentGroup) parentGroup = '0';
            await deleteProduct(parent_id, 'group')
        } else {
            alert('DELETED CANCEL');
        }
    }

    return (
        <div className={s['tree-container']}>
            {treeView &&
                // <div className={s.tree} >
                <Modal>
                    <div className={s['tree-modal']}>
                        <Tree
                            data={groups}
                            rootLabel="Price"
                            treeLabel="Groups"
                            callback={callbackTree}
                            viewEdit={viewEdit}
                            pId={parent_id}
                        />
                    </div>
                </Modal>
                // </div>
            }
            {parent_id !== '0' &&
                <div onClick={() => getProductId(parent_id, true)} className={s.edit}>
                    <i className='fa fa-edit fa-1x'></i>
                </div>
            }
            <div className={s['g-tree']} onClick={() => onDivClick()}>
                <div className='parent_id'>
                    {label || gLabel}
                    {/* <i className='fa fa-share-alt fa-1x'></i> */}
                    <i className='fa fa-bars fa-1x'></i>
                </div>
            </div >
            {isEmpty &&
                <div onClick={delGroup} className={s.del}>
                    <i className='fa fa-trash-alt'></i>
                </div>
            }
        </div>
    )
}

export default GroupsTree;
