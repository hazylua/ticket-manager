import clsx from 'clsx';
import React from 'react';

function LoadingOverlay({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'absolute w-full h-full top-0 left-0 flex items-center justify-center backdrop:blur-sm duration-200 ease-in',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default LoadingOverlay;
