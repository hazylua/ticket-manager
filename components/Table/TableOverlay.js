import React from 'react';

function TableOverlay({ children, rowsFiller, info }) {
  return (
    <>
      {children}
      {rowsFiller}
      {info && (
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full duration-200 ease-in backdrop-blur-sm'>
          {info}
        </div>
      )}
    </>
  );
}

export default TableOverlay;
