import clsx from 'clsx';
import React from 'react';

import TextInput from './TextInput';

function Field({ startIcon, children, ...props }) {
  return (
    <label className='relative block'>
      {startIcon && (
        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
          {startIcon}
        </span>
      )}
      <TextInput {...props} className={clsx(startIcon && 'pl-9')} />
    </label>
  );
}

export default Field;
