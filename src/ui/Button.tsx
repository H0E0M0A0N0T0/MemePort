import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'rounded-lg font-medium transition-all duration-300',
        {
          'bg-accent hover:bg-accent/90 text-white': variant === 'primary',
          'bg-secondary hover:bg-secondary/90 text-white': variant === 'secondary',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        'hover:shadow-[0_0_15px_rgba(108,99,255,0.3)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};