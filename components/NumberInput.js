import clsx from 'clsx';
import React from 'react';

/**
 * @typedef {import("react").InputHTMLAttributes.<HTMLInputElement>} InputHTMLAttributes
 * @typedef {import("react").DetailedHTMLProps.<InputHTMLAttributes, HTMLInputElement>} InputProps
 * @param {InputProps} props */
function NumberInput({ className, ...props }) {
  return (
    <input
      className={clsx(
        'placeholder:italic placeholder:text-neutral-400 bg-white border border-slate-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm',
        className,
      )}
      type='number'
      {...props}
    />
  );
}

export default NumberInput;
