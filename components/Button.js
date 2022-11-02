import clsx from 'clsx';
import React from 'react';

function Button({ children, className, ...props }) {
  return (
    <button
      className={clsx(
        'ease-in duration-200 px-3 py-1 rounded text-neutral-50 border uppercase font-mono text-sm font-bold shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
