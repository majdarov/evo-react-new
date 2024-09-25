import React, { useContext, useEffect, useState } from "react";
import { CurrentPidContext } from './Tree';
import { Callback } from "./types";

const Node = (props: React.PropsWithoutRef<any>) => {

  const context = useContext(CurrentPidContext) as Record<string, any>;
  const [icon, setIcon] = useState<string>('far fa-folder') /* props.hidden ? 'far fa-folder' : 'far fa-folder-open' */;
  const [isOpen, setIsOpen] = useState<string>('closed') /* props.hidden ? 'closed' : 'open' */;
  const hasChildren = !!props.children.length;
  const [hidden, setHidden] = useState<boolean>(props.hidden);
  const [selected, setSelected] = useState(false);
  const callback: Callback = props.callback

  useEffect(() => {
    if (hidden) {
      setIcon("far fa-folder");
      setIsOpen(hasChildren ? "closed children" : "closed");
    } else {
      setIcon("far fa-folder-open");
      setIsOpen(hasChildren ? "open children" : "open");
    }
  }, [hidden, hasChildren, props.id])

  useEffect(() => {
    if (props.id === context.pId) {
      setSelected(true);
    }
    if (!!context.arrNotHidden.length) {
      if (context.arrNotHidden.includes(props.id)) setHidden(false);
    }
    return () => setSelected(false);
  }, [context.arrNotHidden, context.pId, props.id])

  const clickGroup = (ev: React.MouseEvent) => {
    const elem = ev.target as HTMLElement
    ev.stopPropagation();
    if (props.id !== '0') setHidden(hidden => !hidden);
    if ( !!callback ) {
      let tagName = elem.tagName;
      let className = elem.className;
      callback(props.id.toString(), tagName, className);
    }
  }

  return (
    <>
      <li id={props.id} className={isOpen} onClick={clickGroup} /* style={{'--open-yellow': 'red'}} */>
        <i className={icon}></i>
        <span className={(selected && props.classSelected) || ''}>
          {props.label}
        </span>
        {(props.id !== '0') && hasChildren &&
          <span className={props.className}>
            {props.children.length}
          </span>}
          {props.viewEdit && props.id !== '0' && <i className='fa fa-edit'></i>}
        {hasChildren && <ul hidden={hidden}>{props.children}</ul>}
      </li>
    </>
  );
};

export default Node;
