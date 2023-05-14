import React, { useState } from 'react';
import { ClientItem } from './ClientItem';
import { useGetClientsQuery } from '../store/apiSlice';
import { ClientForm, DeleteClient, Modal, Tooltip } from '../components';

export const ClientsList = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetClientsQuery();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const [successTooltip, setSuccessTooltip] = useState(null);
  const [tooltipText, setTooltipText] = useState('');
  const [visibleDeleteClient, setVisibleDeleteClient] = useState(false);
  const [visibleEditClient, setVisibleEditClient] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);

  let content;

  const modalTitle = visibleDeleteClient
    ? 'Delete'
    : visibleEditClient
    ? 'Edit Client'
    : '';

  const modalContent = visibleDeleteClient ? (
    <DeleteClient
      setVisibleTooltip={setVisibleTooltip}
      setTooltipText={setTooltipText}
      setSuccessTooltip={setSuccessTooltip}
      clientInfo={clientInfo}
      setActive={setVisibleModal}
    />
  ) : visibleEditClient ? (
    <ClientForm
      setActive={setVisibleModal}
      setVisibleTooltip={setVisibleTooltip}
      setTooltipText={setTooltipText}
      setSuccessTooltip={setSuccessTooltip}
      clientInfo={clientInfo}
    />
  ) : (
    ''
  );

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content =
      data &&
      data.clients.map((client) => (
        <li key={client.id}>
          <ClientItem
            visibleDelete={setVisibleDeleteClient}
            visibleEdit={setVisibleEditClient}
            setActive={setVisibleModal}
            client={client}
            getClientInfo={setClientInfo}
          />
        </li>
      ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div className='list'>
      <div className='list__header'>
        <span className='list__header-title'>Full name</span>
        <span className='list__header-title'>Age</span>
        <span className='list__header-title'>Telephone</span>
      </div>
      <ul>{content}</ul>

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
    </div>
  );
};
