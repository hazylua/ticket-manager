import React from 'react';

function Select({ options, ...props }) {
  return (
    <select
      className='py-0.5 pl-2 bg-white border rounded-md shadow-sm pr-8 border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
      {...props}
    >
      {options.map((option, idx) => (
        <option
          key={idx}
          value={option.value}
          // className='w-full px-2 py-1 duration-300 border-b border-gray-400 first:rounded-t-md last:rounded-b-md hover:bg-sky-500 ui-active:bg-sky-500 ui-active:text-inherit ui-not-active:bg-gray-700 ui-not-active:text-inherit hover:ease-in first:border-t last:border-b first:border-b-0 border-x'
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
