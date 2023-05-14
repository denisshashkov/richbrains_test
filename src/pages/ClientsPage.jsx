import React, { useState } from 'react';
import { ClientForm, ClientsList, Modal, Tooltip } from '../components';
import { Button } from '../ui/Button';
import { Plus } from '../assets/icons';
import { useSelector } from 'react-redux';

export const ClientsPage = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [successTooltip, setSuccessTooltip] = useState(null);
  const isAuth = useSelector((state) => state.auth.token);

  return (
    <div className='clients'>
      <ClientsList />
      {isAuth && (
        <Button
          primary
          className='clients__add-button'
          onClick={() => setVisibleModal(true)}
        >
          <Plus />
        </Button>
      )}
      {visibleModal && (
        <Modal
          title='New Client'
          active={visibleModal}
          setActive={setVisibleModal}
        >
          <ClientForm
            setActive={setVisibleModal}
            setVisibleTooltip={setVisibleTooltip}
            setTooltipText={setTooltipText}
            setSuccessTooltip={setSuccessTooltip}
          />
        </Modal>
      )}
      {visibleTooltip && (
        <Tooltip success={successTooltip} setVisibleTooltip={setVisibleTooltip}>
          {tooltipText}
        </Tooltip>
      )}
    </div>
  );
};
