import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../store/apiSlice';
import { signIn } from '../store/authSlice';
import { HidePassword, ShowPassword } from '../assets/icons';

export const LoginForm = ({
  setVisibleModal,
  setVisibleTooltip,
  setSuccessTooltip,
  setTooltipText,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const userData = await login(data).unwrap();
      dispatch(signIn(userData));
      reset();
      setVisibleModal(false);
      setVisibleTooltip(true);
      setSuccessTooltip(true);
      setTooltipText('login completed successfully');
      setTimeout(() => {
        setVisibleTooltip(false);
      }, 3000);
    } catch (err) {
      setVisibleTooltip(true);
      reset();
      setTooltipText('something wrong');
      setSuccessTooltip(false);
      setTimeout(() => {
        setVisibleTooltip(false);
      }, 5000);
    }
  };

  return (
    <form className='form login' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type='text'
          className='form__input'
          {...register('login', {
            required: 'required field',
            minLength: { value: 3, message: 'min 3 symbols' },
          })}
        />
        {errors?.login && (
          <p className='form__error-text'>{errors?.login?.message}</p>
        )}
      </div>
      <div>
        <Input
          type={passwordShown ? 'text' : 'password'}
          className='form__input'
          {...register('password', {
            required: 'required field',
            minLength: { value: 6, message: 'min 6 symbols' },
          })}
        >
          {passwordShown ? (
            <HidePassword
              className='form__aye-icon'
              onClick={() => setPasswordShown(false)}
            />
          ) : (
            <ShowPassword
              className='form__aye-icon'
              onClick={() => setPasswordShown(true)}
            />
          )}
        </Input>

        {errors?.password && (
          <p className='form__error-text'>{errors?.password?.message}</p>
        )}
      </div>

      <div className='form__button-wrap'>
        <Button
          className='login__btn-primary'
          primary
          disabled={!isValid}
          type='submit'
        >
          Sign in
        </Button>
        <Button
          className='login__btn-transparent'
          transparent
          onClick={() => setVisibleModal(false)}
        >
          Close
        </Button>
      </div>
    </form>
  );
};
