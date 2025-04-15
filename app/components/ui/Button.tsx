import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] focus-visible:ring-[var(--ring-color)] disabled:opacity-60 disabled:pointer-events-none active:scale-[0.97] transform',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--bg-accent)] text-[var(--text-on-accent)] hover:bg-[var(--bg-accent-hover)] hover:brightness-110 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]',
        secondary: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] hover:bg-[var(--bg-subtle)] hover:border-[var(--border-secondary)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]',
        ghost: 'hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]',
        link: 'text-[var(--text-accent)] underline-offset-4 hover:underline hover:brightness-115',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
