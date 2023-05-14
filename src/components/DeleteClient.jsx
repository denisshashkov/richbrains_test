import React from 'react';
import { Button } from '../ui/Button';
import { useDeleteClientMutation } from '../store/apiSlice';

export const DeleteClient = ({
  setActive,
  clientInfo,
  setVisibleTooltip,
  setSuccessTooltip,
  setTooltipText,
}) => {
  const [deleteClient] = useDeleteClientMutation();
  const clientId = clientInfo.id;
  const deleteClientHandler = async () => {
    try {
      await deleteClient(clientId);
      setActive(false);
      setVisibleTooltip(true);
      setSuccessTooltip(true);
      setTooltipText('client deleted successfully');
      setTimeout(() => {
        setVisibleTooltip(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='delete'>
      <span className='delete__text'>
        Are you sure you want to delete client ?
      </span>
      <Button warning onClick={deleteClientHandler}>
        Yes, delete
      </Button>
      <Button
        className='delete__cancel-btn'
        transparent
        onClick={() => setActive(false)}
      >
        No, close
      </Button>
    </div>
  );
};
