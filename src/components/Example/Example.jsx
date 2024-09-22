import React, { useEffect } from 'react';
import './example.css'

const Example = () => {

    return (
        <div className="parent">
            <div id='1' className="section yellow" contentEditable>
            Min: 100px / Max: 25%
            </div>
            <div id='2' className="section blue" contentEditable>
            This element takes the second grid position (1fr), meaning
            it takes up the rest of the remaining space.
            </div>
        </div>
    )
}

export default Example;
