import React from 'react';

export const Input = React.forwardRef(
  ({ className, defaultValue, label, children, ...attrs }, ref) => {
    return (
      <div className='input-wrap'>
        <label>{label}</label>
        <input
          defaultValue={defaultValue}
          ref={ref}
          className={className}
          {...attrs}
        />
        {children}
      </div>
    );
  }
);
