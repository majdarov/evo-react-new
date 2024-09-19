// import React, { useEffect, useState } from 'react';

const ProgressBar = (props) => {
  return (
    <div>
      <h5 style={{display: 'inline'}}>{props.text}</h5><progress></progress>
    </div>
  );
};

export default ProgressBar;
