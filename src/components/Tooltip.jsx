import React from 'react';
import ReactDOM from 'react-dom';

import { Close } from '../assets/icons';

const portal = document.getElementById('portal');

export const Tooltip = ({ children, setVisibleTooltip, success }) =>
  ReactDOM.createPortal(
    <div className={success ? 'tooltip success' : 'tooltip unsuccess'}>
      <Close
        className='tooltip__close'
        onClick={() => setVisibleTooltip(false)}
      />
      <span className='tooltip__text'>{children}</span>
    </div>,
    portal
  );
