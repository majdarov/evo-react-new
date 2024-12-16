import React from "react";
import s from './Form.module.css';

const FormImg = ({ photo }) => {

  return (
    <>
      <img className={s['big-img']}
        src={photo}
        alt="no" tabIndex='-1'
        style={{
          display: 'inline-block', height: '90vh',
          position: 'fixed', top: '5vh', left: 'calc((100vw - 90vh)/2)',
          verticalAlign: 'middle',
        }}
      /><span></span>
    </>
  );
}

export default FormImg;
