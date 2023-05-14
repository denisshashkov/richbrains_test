import React from 'react';

export const PhoneInput = React.forwardRef(
  ({ className, defaultValue, label, children, ...attrs }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <select className='select' name='' id=''>
          <option>Mob</option>
          <option>Home</option>
        </select>
        <input
          defaultValue={defaultValue}
          ref={ref}
          className={className}
          placeholder='+xx xxx xxx xxxx'
          {...attrs}
        />
        {children}
      </div>
    );
  }
);
