import React from 'react';

function TitleHeader({ title, accent, children }) {
  return (
    <div className='flex items-center justify-between flex-grow w-full gap-2 px-4 py-3 border-b'>
      <h1 className='inline-block text-2xl h-fit'>
        {title}
        {accent && (
          <span className='ml-2 duration-200 ease-in text-neutral-300 hover:text-sky-400'>
            / {accent}
          </span>
        )}
      </h1>

      {children && <div className='flex justify-end flex-grow gap-4'>{children}</div>}
    </div>
  );
}

export default TitleHeader;
