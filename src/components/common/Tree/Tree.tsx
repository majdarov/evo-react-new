import React, { ReactNode, useEffect, useState } from "react";
import s from "./Tree.module.css";
import createTree, { chooseNotHiddenGroups } from "./treeFunction";
import Node from "./Node";
import { TreeNode, TreeProps } from "./types";

export const CurrentPidContext = React.createContext({ pId: 'no' });

const Tree = (props: TreeProps) => {

  const nodeRoot = { id: '0', label: props.rootLabel, childs: [], pid: 'Tree' };
  const tree = { id: "Tree", label: props.treeLabel, childs: [nodeRoot], pid: null };
  const [arrNotHidden, setArrNotHidden] = useState<string[]>([]);
  const context = { pId: props.pId, arrNotHidden };

  createTree(props.data, tree);

  function createSubTree(item: TreeNode, lvl = 0) {
    let hidden;
    lvl += 1;
    let children: ReactNode[] = [];
    if (item.childs?.length) {
      children = item.childs.map(elem => {
        return createSubTree(elem, lvl);
      });
    }
    hidden = lvl > 1 && !arrNotHidden.includes(item.id);
    return (
      <Node
        id={item.id}
        parent_id={item.pid}
        key={item.id}
        label={item.label}
        children={children}
        hidden={hidden}
        className={s['children-length']}
        classSelected={s.selected}
        callback={props.callback}
        viewEdit={props.viewEdit}
      />
    );
  }

  useEffect(() => {
    let arr = chooseNotHiddenGroups(props.pId, props.data);
    setArrNotHidden([...arr]);
  }, [props.data, props.pId])

  return (
    <CurrentPidContext.Provider value={context}>
      <div id={tree.id} className={s.tree}>
        <h3>{tree.label}</h3>
        <ul>{createSubTree(nodeRoot)}</ul>
      </div>
    </CurrentPidContext.Provider>

  );
};

export default Tree;
