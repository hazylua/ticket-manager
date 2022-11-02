import clsx from 'clsx';
import React from 'react';

import TextInput from './TextInput';

function Field({ startIcon, children, className, inputProps, ...props }) {
  return (
    <label className={clsx('relative block', className)} {...props}>
      {startIcon && (
        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
          {startIcon}
        </span>
      )}
      <TextInput {...inputProps} className={clsx(startIcon && 'pl-9')} />
    </label>
  );
}

export default Field;
