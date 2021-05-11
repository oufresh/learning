import React from 'react';
import './Switch.css';

const Switch = ({ checked, onChange, key, className }: { checked: boolean, onChange?: () => any, key?: string | number, className?: string }) => {
    return (
        <label key={key} className={"switch" + (className ? " " + className : "")}>
            <input type="checkbox" checked={checked} onChange={onChange}/>
            <span className="slider round"></span>
        </label>
    );
};

export default Switch;