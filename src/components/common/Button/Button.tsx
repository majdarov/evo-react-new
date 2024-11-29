import s from './Button.module.css'

export interface IButtonProps {
    type?: string;
    label: string;
    icon: string;
    callback?: Function;
}

export function Button({ type, label, icon, callback }: IButtonProps) {
    callback ??= () => { }
    return (
        <div className={s['filter-button']}>
            {/* <input type={type} value={label} className={s.hidden} /> */}
            <span className={s.filter} onClick={() => callback()}>
                {label}
                <i className={icon}></i>
            </span>
        </div>
    )
}
