import classNames from 'classnames';

export const Button = ({
  children,
  transparent,
  primary,
  warning,
  className,
  ...attrs
}) => {
  const classes = classNames(className, 'btn', {
    primary: primary,
    warning: warning,
    transparent: transparent,
  });
  return (
    <button className={classes} {...attrs}>
      {children}
    </button>
  );
};
