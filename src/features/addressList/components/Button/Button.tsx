import { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  isActive?: boolean;
  isOpen?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isActive, isOpen, ...props }, ref) => {
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
        )}
        ref={ref}
      >
        <span className={styles.openSymbol}>{openSymbol}</span>
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';
