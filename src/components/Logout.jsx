import React from 'react';
import { Button } from '../ui/Button';

export const Logout = ({
  setVisibleModal,
  setVisibleTooltip,
  setSuccessTooltip,
  setTooltipText,
}) => {
  const logoutHandler = () => {
    sessionStorage.setItem('token', '');
    setVisibleModal(false);
    setVisibleTooltip(true);
    setSuccessTooltip(true);
    setTooltipText('logout successfully');
    setTimeout(() => {
      setVisibleTooltip(false);
    }, 3000);
    window.location.reload();
  };

  return (
    <div className='logout'>
      <span className='logout__text'>Are you sure you want to sign out?</span>
      <Button className='logout__logout-btn' onClick={logoutHandler} primary>
        Yes, sign out
      </Button>
      <Button
        className='logout__cancel-btn'
        transparent
        onClick={() => setVisibleModal(false)}
      >
        No, close
      </Button>
    </div>
  );
};
