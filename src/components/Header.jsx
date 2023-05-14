import React, { useState } from 'react';
import { Modal, Tooltip, Logout } from '../components';
import { Button } from '../ui/Button';
import { SignIn } from '../assets/icons';
import { LoginForm } from './LoginForm';
import { useSelector } from 'react-redux';

export const Header = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const [successTooltip, setSuccessTooltip] = useState(null);
  const [tooltipText, setTooltipText] = useState('');
  const isAuth = useSelector((state) => state.auth.token);

  const modalTitle = isAuth ? 'Sign out' : 'Sign in';

  const modalContent = isAuth ? (
    <Logout
      setVisibleModal={setVisibleModal}
      setVisibleTooltip={setVisibleTooltip}
      setTooltipText={setTooltipText}
      setSuccessTooltip={setSuccessTooltip}
    />
  ) : (
    <LoginForm
      setVisibleModal={setVisibleModal}
      setVisibleTooltip={setVisibleTooltip}
      setTooltipText={setTooltipText}
      setSuccessTooltip={setSuccessTooltip}
    />
  );

  return (
    <header className='header'>
      <div className='header__logo'>
        <span className='header__logo-text'>RichBrains</span>
      </div>
      <span className='header__title'>Clients</span>
      <Button
        primary
        className='header__button'
        onClick={() => setVisibleModal(true)}
      >
        <SignIn />
        <span>{isAuth ? 'Sign out' : 'Sign in'}</span>
      </Button>
      {visibleModal && (
        <Modal title={modalTitle} setActive={setVisibleModal}>
          {modalContent}
        </Modal>
      )}
      {visibleTooltip && (
        <Tooltip success={successTooltip} setVisibleTooltip={setVisibleTooltip}>
          {tooltipText}
        </Tooltip>
      )}
    </header>
  );
};
