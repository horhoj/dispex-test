import { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  isActive?: boolean;
  isOpen?: boolean;
  isFitContent?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, isActive, isOpen, isFitContent = false, ...props },
    ref,
  ) => {
    let openSymbol = '';
    if (isOpen !== undefined) {
      openSymbol = isOpen ? '--' : '+';
    }

    return (
      <button
        {...props}
        className={classNames(
          styles.Button,
          className,
          isActive && styles.active,
          isFitContent && styles.firContent,
        )}
        ref={ref}
      >
        {!isFitContent && (
          <span className={styles.openSymbol}>{openSymbol}</span>
        )}
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';
