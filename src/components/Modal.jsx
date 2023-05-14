import React from 'react';
import ReactDOM from 'react-dom';
import { Close } from '../assets/icons';

const portal = document.getElementById('portal');

export const Modal = ({ title, active, setActive, children }) =>
  ReactDOM.createPortal(
    <div className='modal' onClick={() => setActive(false)}>
      <div className='modal__content' onClick={(e) => e.stopPropagation(e)}>
        <Close
          className='modal__content-close'
          onClick={() => setActive(false)}
        />
        <h1 className='modal__title'>{title}</h1>
        {children}
      </div>
    </div>,
    portal
  );
