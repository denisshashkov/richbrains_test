import React from 'react';
import { MaleAvatar } from '../assets/icons';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAddClientMutation, useEditClientMutation } from '../store/apiSlice';
import { PhoneInput } from '../ui/PhoneInput';

export const ClientForm = ({
  clientInfo,
  setActive,
  setVisibleTooltip,
  setTooltipText,
  setSuccessTooltip,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      name: clientInfo ? clientInfo.name : '',
      surname: clientInfo ? clientInfo.surname : '',
      age: clientInfo ? clientInfo.age : '',
      phone: clientInfo ? clientInfo.phone : '',
    },
    mode: 'onChange',
  });
  const [addClient] = useAddClientMutation();

  const [editClient] = useEditClientMutation();

  const id = clientInfo?.id;

  const onSubmit = async (data) => {
    try {
      if (!id) {
        await addClient(data);
        reset();
        setActive(false);
        setVisibleTooltip(true);
        setSuccessTooltip(true);
        setTooltipText('client add successfully');
        setTimeout(() => {
          setVisibleTooltip(false);
        }, 3000);
      } else if (id) {
        await editClient({ ...data, id });
        reset();
        setActive(false);
        setVisibleTooltip(true);
        setSuccessTooltip(true);
        setTooltipText('client edit successfully');

        setTimeout(() => {
          setVisibleTooltip(false);
        }, 3000);
      }
    } catch (err) {
      setVisibleTooltip(true);
      setTooltipText('something wrong');
      setSuccessTooltip(false);
      setTimeout(() => {
        setVisibleTooltip(false);
      }, 5000);
    }
  };

  return (
    <>
      <form
        typeof='submit'
        className='form client'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='form__avatar-wrap'>
          <MaleAvatar className='form__avatar' />
        </div>
        <div>
          <div className='form__input-wrap'>
            <div>
              <Input
                name='name'
                label='First name'
                type='text'
                className='form__input'
                {...register('name', {
                  required: 'required field',
                  minLength: { value: 3, message: 'min 3 symbols' },
                })}
              />
              {errors?.name && (
                <p className='form__error-text'>{errors?.name?.message}</p>
              )}
            </div>
            <div>
              <Input
                name='surname'
                label='Last name'
                type='text'
                className='form__input'
                {...register('surname', {
                  required: 'required field',
                  minLength: { value: 3, message: 'min 3 symbols' },
                })}
              />
              {errors?.surname && (
                <p className='form__error-text'>{errors?.surname?.message}</p>
              )}
            </div>
          </div>
          <div className='form__input-wrap'>
            <div>
              <Input
                name='age'
                label='Age'
                type='number'
                className='form__input'
                {...register('age', {
                  required: 'required field',
                  min: { value: 18, message: 'min 18' },
                  max: { value: 99, message: 'max 99' },
                })}
              />
              {errors?.age && (
                <p className='form__error-text'>{errors?.age?.message}</p>
              )}
            </div>
          </div>
          <div className='form__input-wrap'>
            <div>
              <PhoneInput
                name='phone'
                label='Telephone'
                type='tel'
                className='form__input form__input-phone'
                {...register('phone', {
                  required: 'required field',
                })}
              />
              {errors?.phone && (
                <p className='form__error-text'>{errors?.phone?.message}</p>
              )}
            </div>
          </div>
          <div className='form__button-wrap'>
            <Button className='form__button' primary disabled={!isValid}>
              Save
            </Button>
            <Button
              transparent
              className='form__button'
              onClick={() => setActive(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
