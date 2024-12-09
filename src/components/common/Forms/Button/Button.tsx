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
                {/* <input type={type} value={label} className={s.hidden} /> */}
                {/* <span className={s.filter} onClick={(e) => callback()}> */}
                <span className={s.filter} onClick={callback}>
                    {label}
                    <i className={icon}></i>
                    {/* {type === 'submit' && <button type="submit" value="Submit" className={s.hidden} />}
                    {type === 'reset' && <button type="reset" value="Reset" className={s.hidden} />} */}
                </span>
            </div>
        </button>
    )
}
