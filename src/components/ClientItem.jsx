import React from 'react';
import { MaleAvatar, Pencil, Phone, Profile, Trash } from '../assets/icons';
import { Button } from '../ui/Button';
import { useSelector } from 'react-redux';

export const ClientItem = ({
  client,
  visibleDelete,
  visibleEdit,
  setActive,
  getClientInfo,
}) => {
  const isAuth = useSelector((state) => state.auth.token);
  const deleteClientHandler = () => {
    setActive(true);
    visibleEdit(false);
    visibleDelete(true);
    getClientInfo(client);
  };

  const editClientHandler = async () => {
    setActive(true);
    visibleDelete(false);
    visibleEdit(true);
    getClientInfo(client);
  };

  return (
    <div className='clientItem'>
      <div className='clientItem__title  '>
        <MaleAvatar />
        <span className='clientItem__title-name'>{`${client.name} ${client.surname}`}</span>
      </div>
      <div className='clientItem__title age'>
        <Profile />
        <span className='clientItem__title-age'>{client.age}</span>
      </div>
      <div className='clientItem__title'>
        <Phone />
        <span className='clientItem__title-telephone'>{client.phone}</span>
      </div>
      {isAuth && (
        <div className='clientItem__button-wrap'>
          <Button
            primary
            className='clientItem__button'
            onClick={editClientHandler}
          >
            <Pencil />
          </Button>
          <Button
            primary
            onClick={deleteClientHandler}
            className='clientItem__button'
          >
            <Trash />
          </Button>
        </div>
      )}
    </div>
  );
};
