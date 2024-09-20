import React from 'react';

const ProgressBar = (props) => {
  return (
    <div>
      <h5 style={{display: 'inline'}}>{props.text}</h5><progress value={props.value ?? null}></progress>
    </div>
  );
};

export default ProgressBar;
