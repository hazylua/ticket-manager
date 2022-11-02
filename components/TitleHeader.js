import React from 'react';

function TitleHeader({ title, accent, children }) {
  return (
    <div className='flex flex-col flex-grow gap-2 px-4 py-3 border-b xl:flex-row'>
      <h1 className='inline-block text-2xl text-center h-fit'>
        {title}
        {accent && (
          <span className='ml-2 duration-200 ease-in text-neutral-300 hover:text-sky-400'>
            / {accent}
          </span>
        )}
      </h1>

      {children && (
        <div className='flex flex-col items-center flex-grow w-full gap-4 xl:w-fit xl:justify-end xl:flex-row'>
          {children}
        </div>
      )}
    </div>
  );
}

export default TitleHeader;
