import clsx from 'clsx';
import React from 'react';

function Container({ children, className, ...props }) {
  return (
    <main
      className={clsx(
        'm-auto w-3/4 mt-10 rounded border border-gray-400 shadow',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}

export default Container;
