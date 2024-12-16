import { MouseEventHandler } from 'react';
import s from './Button.module.css'

export interface IButtonProps {
    type?: 'submit' | 'reset' | 'button';
    label: string;
    icon: string;
    callback?: MouseEventHandler;
}

export function Button({ type, label, icon, callback }: IButtonProps) {
    callback ??= (e: any) => { console.log(e.target) };
    return (
        <button type={type}>
            <div className={s['filter-button']}>
                <span className={s.filter} onClick={callback}>
                    {label}
                    <i className={icon}></i>
                </span>
            </div>
        </button>
    )
}
